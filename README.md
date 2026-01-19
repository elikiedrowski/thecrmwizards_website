# The CRM Wizards Website

A modern, professional website showcasing AI-powered Salesforce solutions with a focus on speed and industry-specific expertise.

## 🎨 Color Palette

**Cyber Wizard Palette (Recommended)**
- Primary Blue: `#0066CC`
- Secondary Blue: `#004B9B`
- Accent Cyan: `#00D4FF`
- Neutral: `#F8FAFC`
- Dark: `#1A1F36`

See `color-palette-preview.html` in your browser to view all three palette options.

## 📁 Project Structure

```
TheCRMWizards_website/
├── index.html                 # Homepage with 3 hero variations
├── contact.html               # Contact form with Salesforce integration
├── capabilities.html          # Salesforce & AI capabilities
├── methodology.html           # 10x Methodology explanation
├── case-studies.html          # Client success stories
├── color-palette-preview.html # Visual color palette preview
│
├── css/
│   └── styles.css            # Main stylesheet (Cyber Wizard palette)
│
├── js/
│   └── main.js               # Interactive features & AI chatbot
│
├── industries/               # Industry-specific pages
│   ├── field-services.html
│   ├── high-growth-tech.html (create from template)
│   ├── professional-services.html (create from template)
│   ├── hospitality-wellness.html (create from template)
│   └── non-profits.html (create from template)
│
└── assets/
    └── images/
        └── logo.png          # Your wizard logo
```

## 🚀 Getting Started

### 1. Add Your Logo

Replace the placeholder logo file:
1. Save your wizard logo as `assets/images/logo.png`
2. Recommended size: 200px height (width will auto-scale)
3. Format: PNG with transparent background

### 2. Configure Salesforce Web-to-Lead

In `contact.html`, update these fields:

```html
<!-- Line ~67 -->
<input type="hidden" name="oid" value="YOUR_SALESFORCE_ORG_ID_HERE">
<input type="hidden" name="retURL" value="https://www.thecrmwizards.com/thank-you.html">
```

**To get your Salesforce Org ID:**
1. Login to Salesforce
2. Setup → Company Information
3. Copy your Organization ID
4. Replace `YOUR_SALESFORCE_ORG_ID_HERE` in contact.html

**To set up Web-to-Lead:**
1. Setup → Web-to-Lead
2. Enable Web-to-Lead
3. Generate the form
4. Map the custom fields for Industry and Project Type (replace `00N` field IDs)

### 3. Configure Google reCAPTCHA v3 (Bot Protection)

**Get your reCAPTCHA keys:**
1. Go to https://www.google.com/recaptcha/admin/create
2. Select reCAPTCHA v3
3. Add your domain (e.g., thecrmwizards.com)
4. Accept terms and submit
5. Copy your Site Key and Secret Key

**Update contact.html:**
1. Replace `YOUR_RECAPTCHA_SITE_KEY_HERE` in the `<head>` section (line ~11)
2. Replace `YOUR_RECAPTCHA_SITE_KEY_HERE` in the JavaScript (line ~306)

**Verify in Salesforce (Optional):**
- The reCAPTCHA token is sent in the `g-recaptcha-response` field
- You can verify it server-side in Salesforce with the Secret Key
- Or simply having it enabled will block most bots automatically

### 4. Test Hero Variations

The homepage includes 3 hero options you can test:
- **Option A**: Speed & Efficiency angle
- **Option B**: Hybrid Architecture angle  
- **Option C**: Results/"Magic" angle

Click the buttons in the top-right of the hero section to switch between them. Choose your favorite and remove the switcher before launch.

### 5. Complete Industry Pages

Use `industries/field-services.html` as a template:

1. Copy `field-services.html` to create the other 4 industry pages
2. Update the content for each industry:
   - **High-Growth Tech**: Focus on RevOps, fundraising, scaling
   - **Professional Services**: Project management, resource allocation, billing
   - **Hospitality & Wellness**: Booking engines, AI receptionists, member portals
   - **Non-Profits**: Donor management, impact tracking, volunteer coordination

## 🤖 AI Interactive Features

### AI Chatbot
- Fixed bottom-right corner
- Click the wizard emoji to activate
- Responds to common questions about services, industries, and timing
- Reset chat functionality to clear conversation history
- Wizard logo displays in all bot messages
- Customizable responses in `js/main.js`

#### Chatbot Questions & Answers

The chatbot can intelligently respond to questions about:

**Greetings**
- Keywords: hello, hi, hey, greetings, good morning, good afternoon
- Response: Welcome message introducing the AI assistant

**10x Methodology**
- Keywords: methodology, 10x, process, how do you work, approach, framework, secret weapon, pillars, 5 pillars, five pillars
- Response: Explains the 10x Methodology combining AI-augmented development, Salesforce expertise, and battle-tested frameworks with the 5 Pillars

**5 Pillars Details**
- Keywords: pillar, five pillars, 5 pillars
- Response: Detailed breakdown of all 5 Pillars - AI-Augmented Coding, Modular Components, Rapid Prototyping, Focus on Outcomes, and Continuous Deployment

**Salesforce**
- Keywords: salesforce, crm, certified, platform, implementation
- Response: Salesforce Registered Partner status, 55+ certifications, and expertise in implementations, migrations, integrations, and custom development

**AI Development**
- Keywords: artificial intelligence, ai development, automation, ai augmented
- Response: AI-augmented development approach and custom AI solutions including intelligent automation and predictive analytics

**Industries**
- Keywords: industry, field service, tech startup, professional services, hospitality, wellness, nonprofit, non-profit, who do you serve
- Response: Lists all 5 key industries served - Field Service & Sales, High-Growth Tech, Professional Services, Hospitality/Health & Wellness, and Non-Profits

**Speed & Timeline**
- Keywords: fast, quick, timeline, how long, duration, weeks, months
- Response: Explains delivery in weeks (not months) and the 4-step process

**Capabilities**
- Keywords: capability, what can you do, services, offerings, solutions
- Response: Two Core Capabilities - Salesforce Core and Custom AI Development, including hybrid solutions

**Mission & Story**
- Keywords: mission, why, story, family
- Response: Mission statement about making enterprise software move at startup speed, family-run values

**Team**
- Keywords: team, who are you, about, experts, wizards
- Response: Colorado-based Salesforce professionals with 55+ certifications and AI tools expertise

**Hybrid Architecture**
- Keywords: hybrid, on platform, off platform, flexibility
- Response: Explains custom mobile/web apps that integrate with Salesforce for on/off-platform flexibility

**Voice Solutions**
- Keywords: voice, hands free, gloves, field workers
- Response: Voice-enabled mobile solutions for gloves-on, internet-off field work environments

**Certifications**
- Keywords: certification, credentials, qualified
- Response: 55+ Salesforce certifications across multiple tracks, Salesforce Registered Partner status

**Contact Requests**
- Keywords: contact, call, meeting, talk, speak, discuss, schedule, book
- Response: Directs to contact page for booking a call

**Unknown Questions**
- For anything not matching the above topics, the bot suggests booking a call with the team for detailed answers

> **Note:** This chatbot Q&A section is maintained automatically. When chatbot responses are updated in `js/main.js`, this documentation will be updated to reflect the changes.

### Voice Assistant (Optional)
- Browser-based speech recognition
- Enable by calling `window.voiceAssistant.startListening()`
- Great for accessibility and demos

### Animations
- Scroll-triggered fade-ins
- Particle background effects
- Counter animations for statistics
- All managed via Intersection Observer in `js/main.js`

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

Mobile menu automatically activates on smaller screens.

## 🎯 Key Features

### Homepage
- ✅ 3 testable hero variations
- ✅ Value proposition sections
- ✅ 5 industry cards
- ✅ Trust indicators with stats
- ✅ AI particle background

### Contact Page
- ✅ Salesforce Web-to-Lead integration
- ✅ Industry & project type selectors
- ✅ Timeline preference
- ✅ Mobile-friendly form
- ✅ Multi-layer bot protection (honeypot, time-based, rate limiting, reCAPTCHA v3)

### 10x Methodology
- ✅ 5 pillars of fast development
- ✅ Week-by-week process timeline
- ✅ Comparison table (traditional vs. 10x)

### Capabilities
- ✅ Salesforce Core expertise
- ✅ AI & Custom Development
- ✅ Technology stack showcase

### Case Studies
- ✅ 3 detailed case study templates
- ✅ Results-focused layout
- ✅ Industry diversity

## 🎨 Customization

### Change Colors
Edit CSS variables in `css/styles.css` (lines 1-20):
```css
:root {
    --primary-blue: #0066CC;
    --secondary-blue: #004B9B;
    --accent-cyan: #00D4FF;
    /* ... */
}
```

### Update Content
All content is in HTML files - no build process needed. Just edit and refresh!

### Add New Pages
1. Copy an existing page
2. Update the navigation in all pages
3. Keep the same header/footer structure

## 🚀 Deployment

### Option 1: GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/thecrmwizards-website.git
git push -u origin main
```
Then enable GitHub Pages in repository settings.

### Option 2: Netlify (Free)
1. Drag and drop the entire folder to Netlify
2. Site goes live instantly
3. Custom domain setup available

### Option 3: Traditional Hosting
Upload all files via FTP to your web host. No special configuration needed.

## 📋 Pre-Launch Checklist

- [ ] Add your logo to `assets/images/logo.png`
- [ ] Configure Salesforce Org ID in `contact.html`
- [ ] Configure reCAPTCHA Site Key in `contact.html` (2 places)
- [ ] Choose and set your preferred hero variation
- [ ] Remove hero switcher buttons (or hide with CSS)
- [ ] Create remaining 4 industry pages
- [ ] Test contact form submission
- [ ] Test on mobile devices
- [ ] Update footer copyright year if needed
- [ ] Add Google Analytics (optional)
- [ ] Test all links

## 🔧 Salesforce Integration Details

### Lead Fields Mapped
- `first_name` → First Name
- `last_name` → Last Name
- `email` → Email
- `company` → Company
- `phone` → Phone
- `00N` → Industry (custom field)
- `00N_project` → Project Type (custom field)
- `description` → Project Description
- `00N_timeline` → Desired Timeline (custom field)

### Creating Custom Fields in Salesforce
1. Setup → Object Manager → Lead
2. Click "Fields & Relationships"
3. Click "New" to create custom fields
4. Note the Field ID (starts with "00N")
5. Replace in contact form

## 🎓 Support & Questions

For questions about customization or Salesforce integration:
- Email: info@thecrmwizards.com
- LinkedIn: linkedin.com/company/the-crm-wizards

## 📝 License

© 2026 The CRM Wizards. All Rights Reserved.

---

Built with ❤️ in Colorado 🏔️
