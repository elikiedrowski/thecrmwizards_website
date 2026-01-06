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

### 3. Test Hero Variations

The homepage includes 3 hero options you can test:
- **Option A**: Speed & Efficiency angle
- **Option B**: Hybrid Architecture angle  
- **Option C**: Results/"Magic" angle

Click the buttons in the top-right of the hero section to switch between them. Choose your favorite and remove the switcher before launch.

### 4. Complete Industry Pages

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
- Customizable responses in `js/main.js` (lines 50-100)

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
