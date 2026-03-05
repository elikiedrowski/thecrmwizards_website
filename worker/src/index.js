// Cloudflare Worker: Form submission proxy with server-side reCAPTCHA verification
// Receives form data -> verifies reCAPTCHA with Google -> forwards to Salesforce

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    if (request.method !== 'POST') {
      return jsonResponse(405, { error: 'Method not allowed' }, env);
    }

    try {
      const formData = await request.formData();

      // 1. Honeypot check (field 00Nal00001CdQuT should be empty)
      const honeypot = formData.get('00Nal00001CdQuT') || '';
      if (honeypot !== '') {
        // Silently reject — don't tell the bot why
        return jsonResponse(200, { success: true, message: 'Submission received' }, env);
      }

      // 2. Verify reCAPTCHA token with Google
      const recaptchaToken = formData.get('g-recaptcha-response');
      if (!recaptchaToken) {
        return jsonResponse(400, { error: 'reCAPTCHA verification required' }, env);
      }

      const recaptchaResult = await verifyRecaptcha(recaptchaToken, env);
      if (!recaptchaResult.success) {
        return jsonResponse(403, { error: 'reCAPTCHA verification failed' }, env);
      }

      if (recaptchaResult.score < parseFloat(env.RECAPTCHA_THRESHOLD || '0.5')) {
        console.log(`Blocked low-score submission: ${recaptchaResult.score}, action: ${recaptchaResult.action}`);
        return jsonResponse(403, { error: 'Submission flagged as suspicious' }, env);
      }

      // 3. Server-side field validation
      const validationError = validateFields(formData);
      if (validationError) {
        return jsonResponse(400, { error: validationError }, env);
      }

      // 4. Forward to Salesforce (strip reCAPTCHA token — Salesforce doesn't need it)
      const sfFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== 'g-recaptcha-response') {
          sfFormData.append(key, value);
        }
      }

      const sfResponse = await fetch(env.SALESFORCE_URL, {
        method: 'POST',
        body: new URLSearchParams([...sfFormData.entries()]),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      console.log(`Salesforce response: ${sfResponse.status}, reCAPTCHA score: ${recaptchaResult.score}`);

      return jsonResponse(200, {
        success: true,
        message: 'Form submitted successfully',
      }, env);

    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse(500, { error: 'Internal server error' }, env);
    }
  },
};

async function verifyRecaptcha(token, env) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });
  return response.json();
}

function validateFields(formData) {
  const firstName = formData.get('first_name') || '';
  const lastName = formData.get('last_name') || '';
  const email = formData.get('email') || '';
  const company = formData.get('company') || '';
  const message = formData.get('description') || '';

  // Required fields
  if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim()) {
    return 'Missing required fields';
  }

  // Email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format';
  }

  // Bot pattern detection (server-side mirror of client checks)
  const suspiciousPatterns = [
    /mugh?GM/i,
    /amugh/i,
    /test{3,}/i,
    /[a-z]+[A-Z]{2,}$/,
    /^[a-z]+\d{5,}@/i,
  ];

  const fieldsToCheck = [firstName, lastName, email, company, message];
  for (const field of fieldsToCheck) {
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(field)) {
        return 'Submission flagged as suspicious';
      }
    }
  }

  // Disposable email domains
  const domain = email.split('@')[1]?.toLowerCase();
  const disposable = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'maildrop.cc'];
  if (disposable.includes(domain)) {
    return 'Please use a business or personal email address';
  }

  return null;
}

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(status, body, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(env),
    },
  });
}
