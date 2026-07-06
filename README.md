# InAmigos Foundation Website — Uniting Minds for Change

Welcome to the official repository for the **InAmigos Foundation** awareness website. This is a modern, responsive, mobile-first, and visually compelling web platform designed to showcase the NGO's mission, vision, flagship projects, and nationwide community impact.

***

## 🌐 Live Demo & Deployment
- **Repository Link:** [https://github.com/akagyani/inamigos-foundation-website](https://github.com/akagyani/inamigos-foundation-website)
- **Deployment Status:** Ready for deployment on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

***

## ✨ Key Features
- **Modern Premium Design:** Agency-style layout, featuring curated typography (Poppins & Inter), smooth hover micro-animations, and soft drop-shadow card aesthetics.
- **Light & Dark Theme Toggle:** Fully custom theme manager with persistent state memory (`localStorage`).
- **Dynamic Flagship Projects Filter:** Categorized tab system (Humanitarian, Education, Environment, Animal Welfare, Women Empowerment) with animated transitions.
- **Expandable Project Cards:** Interactive "Learn Details" drawers listing program objectives and custom impact indicators.
- **Animated Impact Counters:** Scroll-triggered counting animation for key statistics (Beneficiaries, States Covered, Active Volunteers).
- **Lightbox Event Gallery:** A responsive media grid with hover zoom overlays and keyboard-navigable lightbox preview modal.
- **Interactive Forms with Validation:** Client-side error checking and simulated success states for both the Volunteer Registration and Contact forms.
- **Interactive Map Placeholder:** Styled gridded map mockup featuring a pulsing location pin for the registered headquarters in Bilaspur, Chhattisgarh.
- **100% Offline-Capable:** Self-contained file architecture utilizing a local download of the Lucide icons library for fast page loading.

***

## 🛠️ Built With
- **Markup:** Semantic HTML5 (Fully structured for WCAG accessibility and SEO indexing)
- **Styling:** Vanilla CSS3 (Custom design system variables, Flexbox, CSS Grid)
- **Scripting:** Pure Vanilla JavaScript (Intersection Observer, DOM manipulation, Form Validation)
- **Icons:** [Lucide Icons](https://lucide.dev) (Hosted locally)

***

## 📂 Project Directory Structure
```text
├── assets/
│   ├── logo.png                  # Official InAmigos Foundation Logo
│   ├── hero_bg.png               # Banner hero background image
│   ├── project_seva.png          # Project SEVA (Humanitarian) cover image
│   ├── project_bachpanshala.png  # Project Bachpanshala (Education) cover image
│   ├── project_udaan.png         # Project Udaan (Women Empowerment) cover image
│   ├── project_jeev.png          # Project Jeev (Animal Welfare) cover image
│   ├── project_prakriti.png      # Project Prakriti (Environment) cover image
│   ├── project_vikas.png         # Project Vikas (Skill Development) cover image
│   └── gallery_1.png to 6.png    # High-quality community drive action photographs
├── index.html                    # Main semantic web layout
├── style.css                     # Custom styles and themes stylesheet
├── app.js                        # Client-side dynamic interaction logic
├── lucide.min.js                 # Offline Lucide Icons script
└── README.md                     # Project documentation
```

***

## 🚀 Local Development Setup
To run this website locally on your system, it is recommended to launch a local HTTP server to prevent cross-origin resource sharing (CORS) issues with local files:

### Using Python (Easiest)
1. Open PowerShell or Terminal in the root directory.
2. Start the local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to `http://localhost:8000`.

### Using Node.js (Alternative)
1. Install `live-server` globally:
   ```bash
   npm install -g live-server
   ```
2. Run `live-server` in the root folder.

***

## 📦 Deployment to Vercel
This website is optimized to deploy directly to Vercel as a Zero-Configuration static site:
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Import Project** and link your GitHub repository.
3. Keep the default settings and click **Deploy**. Vercel will automatically host it on a global CDN.

***

## 🤝 Volunteer & Support
InAmigos Foundation is a Section 8 registered, CSR-1 compliant non-profit. Donations are eligible for tax exemption under Section 80G and 12A of the Income Tax Act.
- **Website:** [https://inamigosfoundation.org.in](https://inamigosfoundation.org.in)
- **Email:** support@inamigosfoundation.org.in
- **Phone:** +91 626 730 9902
- **Address:** Ward No. 5, Gram Post, Sipat Ujwal Nagar, Bilaspur, Chhattisgarh, PIN-495555, India.

---
*Created with compassion for a better tomorrow.*
