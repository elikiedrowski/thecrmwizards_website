// CRM Wizards - Main JavaScript
// AI-Powered Interactive Features

// ============================================
// Dark Mode Toggle
// ============================================
// Apply saved theme immediately (before DOM loads to prevent flash)
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Setup dark mode toggle after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    const themeIcon = darkModeToggle?.querySelector('.theme-icon');
    
    // Update icon based on current theme
    const currentTheme = html.getAttribute('data-theme') || 'light';
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
        });
    }
});

// ============================================
// Navigation & Menu
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown toggle for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.nav-dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// Hero Section Switcher
// ============================================

function switchHero(option) {
    const heroes = {
        A: {
            badge: '🚀 AI-Powered Development',
            title: 'Enterprise Software at the Speed of AI',
            subtitle: 'We are The CRM Wizards. We combine deep Salesforce certification with next-gen AI development to deliver custom solutions in 1/10th the time of traditional consultancies.',
            primaryBtn: 'See How We Do It',
            secondaryBtn: 'Explore Industries'
        },
        B: {
            badge: '⚡ Hybrid Architecture',
            title: 'Salesforce Expertise. Custom AI Power. No Licensing Limits.',
            subtitle: 'Solve your biggest business problems both on and off the Salesforce platform. From "gloves-on" voice apps for field workers to customer portals that scale without license bloat.',
            primaryBtn: 'View Solutions',
            secondaryBtn: 'Talk to an Architect'
        },
        C: {
            badge: '✨ Advanced Engineering',
            title: 'It Feels Like Magic. It\'s Actually Advanced Engineering.',
            subtitle: 'Whether it\'s Field Service voice apps or Startup revenue engines, we architect high-impact software solutions faster than you thought possible. Small team, deep expertise, massive results.',
            primaryBtn: 'Find Your Use Case',
            secondaryBtn: 'Contact Us'
        }
    };
    
    const hero = heroes[option];
    if (hero) {
        document.getElementById('hero-badge').textContent = hero.badge;
        document.getElementById('hero-title').textContent = hero.title;
        document.getElementById('hero-subtitle').textContent = hero.subtitle;
        document.getElementById('hero-primary-btn').textContent = hero.primaryBtn;
        document.getElementById('hero-secondary-btn').textContent = hero.secondaryBtn;
        
        // Update active button
        document.querySelectorAll('.hero-switcher button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// ============================================
// AI Chatbot
// ============================================

class AIChatbot {
    constructor() {
        this.chatWindow = document.getElementById('chat-window');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatBody = document.getElementById('chat-body');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        
        this.responses = {
            greeting: [
                "Hello! I'm the CRM Wizards AI assistant. How can I help you today?",
                "Hi there! Looking for Salesforce solutions or AI-powered development?",
                "Welcome! I'm here to help you find the perfect solution for your business."
            ],
            services: [
                "We specialize in Salesforce implementations, custom AI development, and hybrid on/off-platform solutions. Which area interests you?",
                "Our core services include: Salesforce consulting, AI-powered web/mobile apps, and the 10x Methodology. What would you like to know more about?"
            ],
            industries: [
                "We serve 5 key industries: Field Services, High-Growth Tech, Professional Services, Hospitality & Wellness, and Non-Profits. Which one describes your business?",
                "We have specialized solutions for various industries. Tell me about your business and I can recommend the best approach."
            ],
            speed: [
                "Our AI-augmented development process allows us to deliver in 1/10th the time of traditional consultancies - typically weeks instead of months!",
                "We leverage AI tools and our 10x Methodology to accelerate development without compromising quality. Want to learn how?"
            ],
            contact: [
                "Great! You can book a discovery call using the form below, or contact us directly. Would you like me to guide you through the process?",
                "I'd be happy to connect you with our team! Let me pull up our contact form for you."
            ],
            default: [
                "That's a great question! Would you like to speak with one of our Salesforce experts? I can schedule a call for you.",
                "I'd love to help you with that. Can you tell me more about your specific needs?",
                "Interesting! Let me connect you with the right person on our team to discuss this further."
            ]
        };
        
        this.initChat();
    }
    
    initChat() {
        if (!this.chatToggle) return;
        
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
        
        // Initial greeting
        setTimeout(() => this.addMessage('bot', this.getRandomResponse('greeting')), 500);
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage('user', message);
        this.chatInput.value = '';
        
        // Simulate typing
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
        }, 800);
    }
    
    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'bot' ? '🧙‍♂️' : '👤'}</div>
            <div class="message-content">${text}</div>
        `;
        this.chatBody.appendChild(messageDiv);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.getRandomResponse('greeting');
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you')) {
            return this.getRandomResponse('services');
        } else if (lowerMessage.includes('industry') || lowerMessage.includes('field service') || lowerMessage.includes('startup')) {
            return this.getRandomResponse('industries');
        } else if (lowerMessage.includes('fast') || lowerMessage.includes('quick') || lowerMessage.includes('speed') || lowerMessage.includes('time')) {
            return this.getRandomResponse('speed');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
            return this.getRandomResponse('contact');
        } else {
            return this.getRandomResponse('default');
        }
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when DOM is loaded
let chatbot;
document.addEventListener('DOMContentLoaded', function() {
    chatbot = new AIChatbot();
});

// ============================================
// AI Particle Animation
// ============================================

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particleCount = 30;
        this.particles = [];
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Observe all sections and cards
    document.querySelectorAll('.section, .card, .feature').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize particle system
    new ParticleSystem('ai-particles');
});

// ============================================
// Form Handling & Salesforce Integration
// ============================================

class SalesforceLeadForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Salesforce Web-to-Lead endpoint
            // NOTE: Replace with your actual Salesforce org ID and endpoint
            const sfEndpoint = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
            
            // Create form data for Salesforce
            const sfFormData = new FormData();
            sfFormData.append('oid', 'YOUR_ORG_ID_HERE'); // Replace with your Salesforce Org ID
            sfFormData.append('retURL', window.location.origin + '/thank-you.html');
            
            // Map form fields to Salesforce fields
            sfFormData.append('first_name', data.firstName || '');
            sfFormData.append('last_name', data.lastName || '');
            sfFormData.append('email', data.email || '');
            sfFormData.append('company', data.company || '');
            sfFormData.append('phone', data.phone || '');
            sfFormData.append('00N...', data.industry || ''); // Replace with your custom field ID
            sfFormData.append('description', data.message || '');
            
            // Submit to Salesforce
            await fetch(sfEndpoint, {
                method: 'POST',
                body: sfFormData,
                mode: 'no-cors' // Required for Salesforce Web-to-Lead
            });
            
            // Show success message
            this.showMessage('success', 'Thank you! We\'ll be in touch soon.');
            this.form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showMessage('error', 'Something went wrong. Please try again or email us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            text-align: center;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;
        
        this.form.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// ============================================
// Interactive Demo Features
// ============================================

class InteractiveDemo {
    constructor() {
        this.initTimelineComparison();
        this.initCounterAnimation();
    }
    
    initTimelineComparison() {
        const comparisonSection = document.querySelector('.comparison');
        if (!comparisonSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTimeline();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(comparisonSection);
    }
    
    animateTimeline() {
        const values = document.querySelectorAll('.comparison-value');
        values.forEach((value, index) => {
            const target = parseInt(value.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    value.textContent = target;
                    clearInterval(timer);
                } else {
                    value.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    initCounterAnimation() {
        const stats = document.querySelectorAll('.stat');
        if (stats.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/[\d]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
}

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    new InteractiveDemo();
    new SalesforceLeadForm('contact-form');
});

// ============================================
// AI Voice Assistant (Optional Enhancement)
// ============================================

class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => this.handleResult(event);
            this.recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
        }
    }
    
    startListening() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
        }
    }
    
    handleResult(event) {
        const transcript = event.results[0][0].transcript;
        console.log('Voice input:', transcript);
        
        // Process voice command and respond
        if (chatbot) {
            chatbot.addMessage('user', transcript);
            const response = chatbot.generateResponse(transcript);
            chatbot.addMessage('bot', response);
            this.speak(response);
        }
        
        this.isListening = false;
    }
    
    speak(text) {
        if (this.synthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            this.synthesis.speak(utterance);
        }
    }
}

// Expose voice assistant globally for optional use
window.voiceAssistant = new VoiceAssistant();

// ============================================
// Exit Intent Popup
// ============================================

class ExitIntentPopup {
    constructor() {
        this.popup = document.getElementById('exitPopup');
        this.closeBtn = document.getElementById('closeExitPopup');
        this.form = document.getElementById('exitPopupForm');
        this.hasShown = localStorage.getItem('exitPopupShown') === 'true';
        this.mouseY = 0;
        
        if (!this.hasShown && this.popup) {
            this.init();
        }
    }
    
    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseY = e.clientY;
        });
        
        // Detect exit intent (mouse leaving viewport at top)
        document.addEventListener('mouseout', (e) => {
            if (e.clientY < 10 && this.mouseY < 10 && !this.hasShown) {
                this.show();
            }
        });
        
        // Close popup
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Close on overlay click
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.close();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.close();
            }
        });
        
        // Handle form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    show() {
        if (!this.hasShown && this.popup) {
            this.popup.classList.add('active');
            this.hasShown = true;
            localStorage.setItem('exitPopupShown', 'true');
        }
    }
    
    close() {
        if (this.popup) {
            this.popup.classList.remove('active');
        }
    }
    
    handleSubmit() {
        const email = this.form.querySelector('input[name="email"]').value;
        
        // Here you would typically send to your email service
        console.log('Exit popup email captured:', email);
        
        // Show success message
        const popup = this.popup.querySelector('.exit-popup');
        popup.innerHTML = `
            <button class="exit-popup-close" onclick="document.getElementById('exitPopup').classList.remove('active')">×</button>
            <div class="exit-popup-icon">✅</div>
            <h2>Thank You!</h2>
            <p>Check your email for your free Salesforce Readiness Assessment and 10x Methodology guide.</p>
            <p style="margin-top: 2rem;"><a href="contact.html" class="btn btn-primary">Schedule Your Discovery Call</a></p>
        `;
        
        // Auto-close after 5 seconds
        setTimeout(() => this.close(), 5000);
    }
}

// Initialize exit intent popup
if (document.getElementById('exitPopup')) {
    new ExitIntentPopup();
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format phone number
function formatPhoneNumber(value) {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Apply phone formatting to inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = formatPhoneNumber(e.target.value);
        });
    });
});
