// ============================================
// Contact Form Handler with Complete Bot Protection
// ============================================

class ContactFormHandler {
    constructor(formId, recaptchaSiteKey = null) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.protection = new FormProtection();
        this.recaptcha = recaptchaSiteKey ? new RecaptchaManager(recaptchaSiteKey) : null;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.formTimestamp = null;

        this.init();
    }

    init() {
        // Set form timestamp when page loads
        this.formTimestamp = Date.now();
        const timestampField = this.form.querySelector('#form_timestamp');
        if (timestampField) {
            timestampField.value = this.formTimestamp;
        }

        // Generate verification token
        this.generateVerificationToken();

        // Load reCAPTCHA if configured
        if (this.recaptcha) {
            this.recaptcha.loadRecaptcha().catch(() => {
                console.warn('reCAPTCHA not available, proceeding without it');
            });
        }

        // Enable submit button after minimum time (prevents instant bot submissions)
        setTimeout(() => {
            if (this.submitButton) {
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'Send My Request';
                console.log('✅ Form ready for submission');
            }
        }, 2000);

        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation feedback
        this.addRealtimeValidation();
    }

    generateVerificationToken() {
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const tokenField = this.form.querySelector('#verification_token');
        if (tokenField) {
            tokenField.value = token;
        }
    }

    addRealtimeValidation() {
        // Email validation
        const emailInput = this.form.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                const result = this.protection.validateEmail(emailInput.value);
                this.showFieldError(emailInput, result);
            });
        }

        // Phone validation
        const phoneInput = this.form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                const result = this.protection.validatePhone(phoneInput.value);
                this.showFieldError(phoneInput, result);
            });
        }

        // Name validation
        const firstNameInput = this.form.querySelector('#first_name');
        if (firstNameInput) {
            firstNameInput.addEventListener('blur', () => {
                const result = this.protection.validateName(firstNameInput.value, 'First name');
                this.showFieldError(firstNameInput, result);
            });
        }

        const lastNameInput = this.form.querySelector('#last_name');
        if (lastNameInput) {
            lastNameInput.addEventListener('blur', () => {
                const result = this.protection.validateName(lastNameInput.value, 'Last name');
                this.showFieldError(lastNameInput, result);
            });
        }
    }

    showFieldError(input, result) {
        // Remove existing error message
        const existingError = input.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Remove error styling
        input.classList.remove('error');

        if (!result.valid) {
            // Add error styling
            input.classList.add('error');

            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = result.error;
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            input.parentElement.appendChild(errorDiv);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Disable submit button to prevent double submission
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Validating...';
        }

        try {
            // Collect form data
            const formData = this.collectFormData();

            // Extra validation for bot patterns across all fields
            const extraValidation = this.validateAllFields(formData);
            if (!extraValidation.valid) {
                console.error('🚫 Submission BLOCKED:', extraValidation.error);
                console.error('📋 Blocked data:', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    company: formData.company
                });
                this.showError(extraValidation.error);
                return;
            }

            // Validate form
            const validationResult = this.protection.validateForm(formData);
            if (!validationResult.valid) {
                console.error('🚫 Submission BLOCKED:', validationResult.error);
                this.showError(validationResult.error);
                return;
            }

            // Get reCAPTCHA token if available
            if (this.recaptcha) {
                if (this.submitButton) {
                    this.submitButton.textContent = 'Verifying...';
                }

                const recaptchaToken = await this.recaptcha.getToken('contact_form');
                if (recaptchaToken) {
                    const recaptchaField = this.form.querySelector('#g-recaptcha-response');
                    if (recaptchaField) {
                        recaptchaField.value = recaptchaToken;
                    }
                }
            }

            // Record submission for rate limiting
            this.protection.recordSubmission();

            // Update submit button
            if (this.submitButton) {
                this.submitButton.textContent = 'Submitting...';
            }

            // Submit form to Salesforce programmatically
            // This prevents bots from bypassing validation by posting directly
            const salesforceUrl = this.form.getAttribute('data-salesforce-url');
            if (!salesforceUrl) {
                throw new Error('Salesforce URL not configured');
            }

            // Create FormData and submit via fetch or form submit
            const formDataToSubmit = new FormData(this.form);
            
            // Use the native form submission (which will now go through our validation)
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = salesforceUrl;
            tempForm.style.display = 'none';
            
            // Copy all form fields
            for (const [key, value] of formDataToSubmit.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            }
            
            document.body.appendChild(tempForm);
            console.log('✅ Validation passed - submitting to Salesforce');
            tempForm.submit();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('An error occurred. Please try again.');
        } finally {
            // Re-enable submit button after delay
            setTimeout(() => {
                if (this.submitButton) {
                    this.submitButton.disabled = false;
                    this.submitButton.textContent = 'Send My Request';
                }
            }, 3000);
        }
    }

    collectFormData() {
        return {
            firstName: this.form.querySelector('#first_name')?.value || '',
            lastName: this.form.querySelector('#last_name')?.value || '',
            email: this.form.querySelector('#email')?.value || '',
            phone: this.form.querySelector('#phone')?.value || '',
            company: this.form.querySelector('#company')?.value || '',
            message: this.form.querySelector('#description')?.value || '',
            honeypot: this.form.querySelector('#website_url')?.value || '',
            timestamp: this.form.querySelector('#form_timestamp')?.value || ''
        };
    }

    validateAllFields(formData) {
        // Extra validation to catch bot patterns in ALL fields
        const suspiciousPattern = /mugh?GM/i;
        const fieldsToCheck = ['firstName', 'lastName', 'company', 'email', 'message'];
        
        for (const field of fieldsToCheck) {
            if (formData[field] && suspiciousPattern.test(formData[field])) {
                console.warn('🚫 Bot detected: muhGM pattern in', field);
                return { valid: false, error: 'Invalid submission detected. Please check your information.' };
            }
        }
        
        return { valid: true };
    }

    showError(message) {
        // Create or update error message
        let errorDiv = this.form.querySelector('.form-error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.style.cssText = `
                padding: 1rem;
                margin-bottom: 1rem;
                background: #f8d7da;
                border: 1px solid #dc3545;
                border-radius: 8px;
                color: #721c24;
                font-weight: 500;
            `;
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }

        errorDiv.textContent = '⚠️ ' + message;
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Re-enable submit button
        if (this.submitButton) {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Send My Request';
        }

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if form exists
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Get reCAPTCHA site key from meta tag or script
    let recaptchaSiteKey = null;
    const recaptchaScript = document.querySelector('script[src*="recaptcha"]');
    if (recaptchaScript) {
        const match = recaptchaScript.src.match(/render=([^&]+)/);
        if (match && !match[1].includes('YOUR_')) {
            recaptchaSiteKey = match[1];
        }
    }

    // Initialize form handler
    const handler = new ContactFormHandler('contact-form', recaptchaSiteKey);
    
    // Log initialization
    if (handler.form) {
        console.log('✅ Form protection active with ' + (recaptchaSiteKey ? 'reCAPTCHA' : 'client-side validation only'));
    }
});
