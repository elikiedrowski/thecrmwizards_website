// ============================================
// Advanced Form Protection System
// Protects against bot submissions with multiple validation layers
// ============================================

class FormProtection {
    constructor() {
        this.submissionLog = this.getSubmissionLog();
        this.maxSubmissionsPerHour = 3;
        this.minFormFillTime = 3000; // 3 seconds minimum
        this.suspiciousPatterns = [
            /mugh?GM/i,  // Common bot pattern
            /amugh/i,    // Variation
            /test{3,}/i,
            /asdf{3,}/i,
            /qwerty{3,}/i,
            /[a-z]+[A-Z]{2,}$/,  // lowercase then multiple capitals at end
            /^[a-z]+\d{5,}@/i, // random letters + many numbers
            /@(temp|trash|disposable|guerrilla|10minute)/i
        ];
    }

    // Rate Limiting - Track submissions by IP (stored locally)
    getSubmissionLog() {
        try {
            const log = localStorage.getItem('formSubmissions');
            return log ? JSON.parse(log) : [];
        } catch (e) {
            return [];
        }
    }

    saveSubmissionLog(log) {
        try {
            localStorage.setItem('formSubmissions', JSON.stringify(log));
        } catch (e) {
            console.error('Failed to save submission log');
        }
    }

    checkRateLimit() {
        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);
        
        // Clean old submissions
        this.submissionLog = this.submissionLog.filter(time => time > oneHourAgo);
        
        if (this.submissionLog.length >= this.maxSubmissionsPerHour) {
            return {
                valid: false,
                error: `Too many submissions. Please wait before trying again.`
            };
        }
        
        return { valid: true };
    }

    recordSubmission() {
        this.submissionLog.push(Date.now());
        this.saveSubmissionLog(this.submissionLog);
    }

    // Email Validation - Check for real domains and suspicious patterns
    validateEmail(email) {
        if (!email) {
            return { valid: false, error: 'Email is required' };
        }

        // Basic format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valid: false, error: 'Invalid email format' };
        }

        // Check for suspicious patterns
        for (const pattern of this.suspiciousPatterns) {
            if (pattern.test(email)) {
                return { valid: false, error: 'Email address appears to be invalid' };
            }
        }

        // Check for common disposable email domains
        const disposableDomains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com',
            'guerrillamail.com', 'mailinator.com', 'maildrop.cc'
        ];
        
        const domain = email.split('@')[1]?.toLowerCase();
        if (disposableDomains.includes(domain)) {
            return { valid: false, error: 'Please use a business or personal email address' };
        }

        // Check for valid TLD
        const tld = domain?.split('.').pop();
        if (!tld || tld.length < 2) {
            return { valid: false, error: 'Invalid email domain' };
        }

        return { valid: true };
    }

    // Phone Validation - Check format and detect patterns
    validatePhone(phone) {
        if (!phone) {
            return { valid: true }; // Phone is optional
        }

        // Remove all non-digits
        const digits = phone.replace(/\D/g, '');

        // Must be 10 or 11 digits (with optional country code)
        if (digits.length < 10 || digits.length > 11) {
            return { valid: false, error: 'Phone number must be 10 digits' };
        }

        // Check for invalid patterns (all same digit, sequential, etc.)
        if (/^(\d)\1{9,}$/.test(digits)) {
            return { valid: false, error: 'Invalid phone number pattern' };
        }

        // Check for sequential numbers
        if (digits.includes('0123456789') || digits.includes('9876543210')) {
            return { valid: false, error: 'Invalid phone number pattern' };
        }

        return { valid: true };
    }

    // Message Validation - Check for gibberish and suspicious content
    validateMessage(message) {
        if (!message || message.trim().length === 0) {
            return { valid: true }; // Message is optional
        }

        // Check minimum length for meaningful message
        if (message.trim().length < 10) {
            return { valid: false, error: 'Please provide more details about your project' };
        }

        // Check for suspicious patterns
        for (const pattern of this.suspiciousPatterns) {
            if (pattern.test(message)) {
                return { valid: false, error: 'Message contains invalid content' };
            }
        }

        // Check for excessive repetition
        if (/(.)\1{10,}/.test(message)) {
            return { valid: false, error: 'Message appears to be invalid' };
        }

        // Check for gibberish (too many consonants in a row)
        const words = message.split(/\s+/);
        for (const word of words) {
            if (word.length > 15 && !/[aeiou]/i.test(word)) {
                return { valid: false, error: 'Message contains invalid text' };
            }
        }

        return { valid: true };
    }

    // Name Validation - Check for suspicious patterns
    validateName(name, fieldName = 'Name') {
        if (!name || name.trim().length === 0) {
            return { valid: false, error: `${fieldName} is required` };
        }

        // Check for minimum length
        if (name.trim().length < 2) {
            return { valid: false, error: `${fieldName} must be at least 2 characters` };
        }

        // Check for muhGM pattern and similar bot signatures
        if (/mugh?GM/i.test(name)) {
            return { valid: false, error: `${fieldName} contains invalid text` };
        }

        // Check for suspicious patterns
        if (/\d{3,}/.test(name)) {
            return { valid: false, error: `${fieldName} appears to be invalid` };
        }

        // Check for excessive special characters
        if (/[^a-zA-Z\s'-]{2,}/.test(name)) {
            return { valid: false, error: `${fieldName} contains invalid characters` };
        }

        // Check for names that end with random capital letters (common bot pattern)
        if (/[a-z]+[A-Z]{2,}$/.test(name)) {
            return { valid: false, error: `${fieldName} appears to be invalid` };
        }

        return { valid: true };
    }

    // Honeypot Check
    validateHoneypot(honeypotValue) {
        if (honeypotValue && honeypotValue !== '') {
            return { valid: false, error: 'Bot detected' };
        }
        return { valid: true };
    }

    // Timestamp Check - Ensure form wasn't filled too quickly
    validateTimestamp(timestamp) {
        if (!timestamp) {
            return { valid: false, error: 'Form validation failed' };
        }

        const formAge = Date.now() - parseInt(timestamp);
        if (formAge < this.minFormFillTime) {
            return { valid: false, error: 'Form submitted too quickly. Please take your time.' };
        }

        // Also check if timestamp is too old (more than 1 hour)
        if (formAge > 3600000) {
            return { valid: false, error: 'Form session expired. Please refresh and try again.' };
        }

        return { valid: true };
    }

    // Duplicate Submission Check
    checkDuplicateSubmission(formData) {
        try {
            const lastSubmission = localStorage.getItem('lastFormData');
            if (lastSubmission) {
                const last = JSON.parse(lastSubmission);
                const lastTime = last.timestamp || 0;
                
                // Check if submitting same data within 5 minutes
                if (Date.now() - lastTime < 300000) {
                    if (last.email === formData.email && 
                        last.message === formData.message) {
                        return { valid: false, error: 'Duplicate submission detected' };
                    }
                }
            }
            
            // Save current submission
            localStorage.setItem('lastFormData', JSON.stringify({
                email: formData.email,
                message: formData.message,
                timestamp: Date.now()
            }));
            
            return { valid: true };
        } catch (e) {
            return { valid: true }; // Don't block if storage fails
        }
    }

    // Complete Form Validation
    validateForm(formData) {
        const checks = [
            this.checkRateLimit(),
            this.validateHoneypot(formData.honeypot),
            this.validateTimestamp(formData.timestamp),
            this.validateName(formData.firstName, 'First name'),
            this.validateName(formData.lastName, 'Last name'),
            this.validateEmail(formData.email),
            this.validatePhone(formData.phone),
            this.validateMessage(formData.message),
            this.checkDuplicateSubmission(formData)
        ];

        for (const check of checks) {
            if (!check.valid) {
                return check;
            }
        }

        return { valid: true };
    }
}

// ============================================
// reCAPTCHA v3 Integration
// ============================================

class RecaptchaManager {
    constructor(siteKey) {
        this.siteKey = siteKey;
        this.isLoaded = false;
    }

    // Load reCAPTCHA script dynamically
    async loadRecaptcha() {
        if (this.isLoaded || !this.siteKey || this.siteKey.includes('YOUR_')) {
            return false;
        }

        return new Promise((resolve, reject) => {
            if (typeof grecaptcha !== 'undefined') {
                this.isLoaded = true;
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                this.isLoaded = true;
                resolve(true);
            };
            
            script.onerror = () => {
                console.warn('reCAPTCHA failed to load');
                reject(false);
            };
            
            document.head.appendChild(script);
        });
    }

    // Execute reCAPTCHA and get token
    async getToken(action = 'submit') {
        if (!this.isLoaded) {
            await this.loadRecaptcha();
        }

        if (!this.isLoaded || typeof grecaptcha === 'undefined') {
            return null;
        }

        try {
            const token = await grecaptcha.execute(this.siteKey, { action });
            return token;
        } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            return null;
        }
    }
}

// ============================================
// Export for use in main.js
// ============================================

window.FormProtection = FormProtection;
window.RecaptchaManager = RecaptchaManager;
