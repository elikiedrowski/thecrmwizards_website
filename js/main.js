// CRM Wizards - Main JavaScript
// AI-Powered Interactive Features

// ============================================
// Testimonial Carousel
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dots = carousel.querySelectorAll('.dot');
        let currentSlide = 0;
        let autoRotateInterval;
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.style.display = 'none');
            
            // Remove active class from all dots
            dots.forEach(dot => dot.style.opacity = '0.3');
            
            // Show current slide
            if (slides[index]) {
                slides[index].style.display = 'block';
                dots[index].style.opacity = '1';
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
            
            // Reset auto-rotation
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 5000);
        }
        
        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Show first slide
        showSlide(0);
        
        // Auto-rotate every 5 seconds
        autoRotateInterval = setInterval(nextSlide, 5000);
    }
});

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
        
        // Website content knowledge base
        this.knowledgeBase = {
            methodology: {
                keywords: ['methodology', '10x', 'process', 'how do you work', 'approach', 'framework', 'secret weapon'],
                response: "Our 10x Methodology combines AI-augmented development, deep Salesforce expertise, and battle-tested frameworks. It's not magic—it's methodology. We deliver enterprise-grade Salesforce and custom web/mobile solutions in weeks, not months."
            },
            pillars: {
                keywords: ['pillar', 'five pillars', '5 pillars'],
                response: "The 5 Pillars of 10x Development are: (1) AI-Augmented Coding - freeing experts to focus on complex business logic, (2) Modular Components - hundreds of reusable components to start with a foundation, (3) Rapid Prototyping - see your solution in days not months, (4) Focus on Outcomes - measured by business value delivered, and (5) Continuous Deployment - deploy multiple times per day. Grounded in Technical Integrity and Robust Performance."
            },
            salesforce: {
                keywords: ['salesforce', 'crm', 'certified', 'platform', 'implementation'],
                response: "We're Salesforce Registered Partners. Our team holds a combined 55+ Salesforce certifications across Application Architect, System Architect, Platform Developer, and Admin tracks. We handle everything from greenfield implementations to complex migrations, integrations, and custom development."
            },
            ai: {
                keywords: ['artificial intelligence', 'ai development', 'automation', 'ai augmented'],
                response: "We use AI-augmented development to accelerate boilerplate code generation, testing, and documentation—freeing our experts to focus on complex business logic and architecture. We also build custom AI solutions including intelligent automation and predictive analytics that integrate directly into your workflows."
            },
            industries: {
                keywords: ['industry', 'field service', 'tech startup', 'professional services', 'hospitality', 'wellness', 'nonprofit', 'non-profit', 'who do you serve'],
                response: "We serve 5 key industries with specialized solutions: Field Service & Sales, High-Growth Tech, Professional Services, Hospitality/Health & Wellness, and Non-Profits. Each industry page shows specific use cases tailored to those sectors."
            },
            speed: {
                keywords: ['fast', 'quick', 'timeline', 'how long', 'duration', 'weeks', 'months'],
                response: "Traditional software projects take months and cost a fortune. We deploy enterprise-grade Salesforce and custom web/mobile solutions in weeks, not months. Our 4-step process: (1) Discovery & Architecture, (2) Rapid Prototyping, (3) Development Sprint, (4) Launch & Optimization."
            },
            capabilities: {
                keywords: ['capability', 'what can you do', 'services', 'offerings', 'solutions'],
                response: "We have Two Core Capabilities: (1) Salesforce Core - certified experts handling implementations, integrations, custom development and optimization, and (2) Custom AI Development - web/mobile apps, voice assistants, and intelligent automation. We combine both for hybrid on/off-platform solutions."
            },
            mission: {
                keywords: ['mission', 'why', 'story', 'family'],
                response: "Our mission is Making Enterprise Software Move at Startup Speed. Traditional consultancies take months to deliver what our AI-augmented team can build in weeks. We're smart, scrappy, and family-run. What motivates us: rapid innovation solves critical business challenges using less capital, while allowing us to carve out more time for the people who matter most."
            },
            team: {
                keywords: ['team', 'who are you', 'about', 'experts', 'wizards'],
                response: "We're The CRM Wizards - Salesforce professionals with a passion for innovation, based in Colorado. We combine deep Salesforce expertise (55+ certifications) with cutting-edge AI tools. We're not replacing human expertise, we're amplifying it through our 10x Methodology."
            },
            hybrid: {
                keywords: ['hybrid', 'on platform', 'off platform', 'flexibility'],
                response: "We don't just configure Salesforce—we build custom mobile and web applications that integrate seamlessly with your CRM. This gives you on-platform security for power users and off-platform flexibility for customers, field workers, or partners who may have limited Salesforce access."
            },
            voice: {
                keywords: ['voice', 'hands free', 'gloves', 'field workers'],
                response: "We build voice-enabled mobile solutions that work when gloves-on and internet-off, perfect for field workers in tough environments where touchscreens fail. These apps use speech recognition for hands-free data entry and work with unreliable connectivity."
            },
            certifications: {
                keywords: ['certification', 'credentials', 'qualified'],
                response: "Our team holds a combined 55+ Salesforce certifications across Application Architect, System Architect, Platform Developer, and Admin tracks. We're also Salesforce Registered Partners. We design solutions that scale."
            }
        };
        
        this.responses = {
            greeting: [
                "Hello! I'm the CRM Wizards AI assistant. I can answer questions about our services, methodology, industries we serve, and more. What would you like to know?",
                "Hi there! I'm here to help you learn about our AI-powered Salesforce solutions and 10x development methodology. What are you interested in?",
                "Welcome! Ask me anything about The CRM Wizards - our capabilities, process, pricing, or how we can help your business."
            ],
            unknown: [
                "That's a great question! I'd love to connect you with our team to discuss this in detail. Would you like to <a href='contact.html' style='color: var(--accent-cyan); text-decoration: underline;'>book a discovery call</a>?",
                "I want to make sure you get the most accurate answer. Our team can provide detailed insights on this - shall I direct you to <a href='contact.html' style='color: var(--accent-cyan); text-decoration: underline;'>schedule a call</a>?",
                "Great question! For specific details like this, I recommend <a href='contact.html' style='color: var(--accent-cyan); text-decoration: underline;'>booking a discovery call</a> with our team. They'll give you a comprehensive answer tailored to your needs."
            ],
            contact: [
                "Perfect! You can <a href='contact.html' style='color: var(--accent-cyan); text-decoration: underline;'>book a discovery call here</a>. Our team will discuss your specific needs and show you exactly how we can help.",
                "Great! Head over to our <a href='contact.html' style='color: var(--accent-cyan); text-decoration: underline;'>contact page</a> to schedule a discovery call. We'd love to discuss how we can deliver your project faster."
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
        
        // Load chat history from localStorage
        this.loadChatHistory();
        
        // Restore chat window state
        const wasOpen = localStorage.getItem('chatWindowOpen') === 'true';
        if (wasOpen) {
            this.chatWindow.classList.add('active');
        }
        
        // If no messages in history, show initial greeting
        const chatHistory = this.getChatHistory();
        if (chatHistory.length === 0) {
            setTimeout(() => this.addMessage('bot', this.getRandomResponse('greeting')), 500);
        }
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
        const isOpen = this.chatWindow.classList.contains('active');
        localStorage.setItem('chatWindowOpen', isOpen);
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
        
        // Save to localStorage
        this.saveChatMessage(sender, text);
    }
    
    saveChatMessage(sender, text) {
        const history = this.getChatHistory();
        history.push({ sender, text, timestamp: Date.now() });
        
        // Keep only last 50 messages
        if (history.length > 50) {
            history.shift();
        }
        
        localStorage.setItem('chatHistory', JSON.stringify(history));
    }
    
    getChatHistory() {
        const stored = localStorage.getItem('chatHistory');
        return stored ? JSON.parse(stored) : [];
    }
    
    loadChatHistory() {
        const history = this.getChatHistory();
        
        // Clear any existing messages
        this.chatBody.innerHTML = '';
        
        // Restore messages
        history.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${msg.sender}-message`;
            messageDiv.innerHTML = `
                <div class="message-avatar">${msg.sender === 'bot' ? '🧙‍♂️' : '👤'}</div>
                <div class="message-content">${msg.text}</div>
            `;
            this.chatBody.appendChild(messageDiv);
        });
        
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
    
    clearHistory() {
        localStorage.removeItem('chatHistory');
        this.chatBody.innerHTML = '';
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings
        if (lowerMessage.match(/\b(hello|hi|hey|greetings|good morning|good afternoon)\b/)) {
            return this.getRandomResponse('greeting');
        }
        
        // Check for contact/call requests
        if (lowerMessage.match(/\b(contact|call|meeting|talk|speak|discuss|schedule|book)\b/)) {
            return this.getRandomResponse('contact');
        }
        
        // Search knowledge base for matching topics
        for (const [topic, data] of Object.entries(this.knowledgeBase)) {
            for (const keyword of data.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        // If no match found, suggest booking a call
        return this.getRandomResponse('unknown');
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
        
        // Don't intercept form submission - let it submit naturally to Salesforce
        // The form already has the correct action URL and all fields configured
        console.log('Salesforce Web-to-Lead form ready - will submit to:', this.form.action);
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
