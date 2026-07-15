# ShieldX Pest Control Services - Premium Website & Android App

A premium, modern, responsive, and SEO-optimized web landing page and Android application built for **ShieldX Pest Control Services** in Solapur, Maharashtra.

This project delivers a dual-experience:
1. **Premium Responsive Website**: Ready for zero-config deployment on **GitHub Pages**.
2. **Polished Android WebView App**: Configured for local bundle loading inside a secure Jetpack Compose container, supporting native dialing and WhatsApp launch handlers.

---

## 🎨 Visual Design Highlights
- **ShieldX Identity System**: Built around Forest Green (`#0B6E4F`) and Warm Gold (`#F4B400`) representing natural safety and corporate trust.
- **Glassmorphism Components**: Transparent blurred overlay navigation and booking panels with micro-borders to establish visual depth.
- **Fluid Layouts**: Responsive grids optimized for 4K desktop screens down to standard Android gesture-pill portrait layouts.
- **Photorealism Guarantee**: Fully styled with authentic Indian home, office, and restaurant photography to represent high professional trust. No generic vector cliparts or cartoons.

---

## 🚀 SEO & Rich Metadata Integrations
- **Title**: `ShieldX Pest Control Services | Best Pest Control Company in Solapur`
- **Dynamic Meta Tags**: Full Open Graph (`og:`) and Twitter Card elements configured with preview image links for rich social sharing.
- **JSON-LD Schema Blocks**:
  - `LocalBusiness`: Geolocation, address details, hours, and direct phone link.
  - `FAQPage`: Structured questions and answers for Google Search accordion indexing.
  - `Product` & `AggregateRating`: Google rich snippets highlighting 5,000+ positive reviews.
  - `BreadcrumbList`: Smooth internal crawling hierarchies.
- **Search Console Ready**: Clean `robots.txt` and fully mapped `sitemap.xml` included at the root level.

---

## 📁 Project Structure

```
├── app/                      # Android Application Module
│   ├── src/main/assets/      # Local Web Assets bundled with the APK
│   │   ├── index.html        # Main High-Fidelity Landing Page
│   │   ├── style.css         # Modern Material CSS Stylesheet
│   │   ├── script.js         # Interactive DOM Animations & Handlers
│   │   ├── robots.txt        # Search engine instructions
│   │   ├── sitemap.xml       # Crawling index map
│   │   └── manifest.json     # Progressive Web App (PWA) manifest
│   └── src/main/java/...     # Native Android WebView and Intent controller
├── index.html                # Root Mirror (GitHub Pages entry point)
├── style.css                 # Root Mirror CSS
├── script.js                 # Root Mirror JS
├── robots.txt                # Root Mirror robots.txt
├── sitemap.xml               # Root Mirror sitemap.xml
├── manifest.json             # Root Mirror manifest.json
└── README.md                 # This Documentation
```

---

## 🛠️ Deployment & Hosting

### 1. Web Deployment (GitHub Pages)
The root level contains all necessary files. Simply push this repository to GitHub:
1. Go to your GitHub Repository **Settings**.
2. Select **Pages** from the left-hand sidebar.
3. Under **Build and deployment**, set the Source to **Deploy from a branch**.
4. Select the `main` or `master` branch and folder `/ (root)`.
5. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/` in under a minute!

---

## 📱 Android App Features
- **Offline First**: The HTML and styling assets are fully bundled in the application's `/assets` folder, loading instantly with zero network latency.
- **Bridge Controllers**: Handles native intent-filters for direct phone dialing and WhatsApp chat launching.
- **Edge-to-Edge**: Respects safe area window insets and camera cutouts with a modern full-screen native overlay.
