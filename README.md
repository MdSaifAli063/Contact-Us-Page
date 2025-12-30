# 📮 Contact Us Page

A modern, responsive “Contact Us” page with a polished UI, dark mode, accessible form validation, and a split layout: “Get in Touch” and “Location” stacked on the left, and the contact form on the right.

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E44D26?logo=html5&logoColor=white&style=for-the-badge" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-264DE4?logo=css3&logoColor=white&style=for-the-badge" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E&style=for-the-badge" />
  <img alt="Responsive" src="https://img.shields.io/badge/Responsive-Yes-22c55e?style=for-the-badge" />
  <img alt="Dark Mode" src="https://img.shields.io/badge/Dark%20Mode-Supported-8b5cf6?style=for-the-badge" />
</p>

## ✨ Highlights

- 🎨 Beautiful, glassy card UI with subtle shadows and hover states
- 🌓 Dark mode toggle with OS preference + local persistence
- 📱 Fully responsive layout (mobile → desktop)
- 🧭 Layout: left column = Get in Touch (top) + Map (bottom), right column = form  spanning full height
- 🧩 Accessible form with labels, aria-live messages, focus rings
- ✅ HTML5 validation, dynamic required fields, character counter
- 🕵️ Honeypot field for spam protection
- 🔔 Inline status alerts and loading spinner
- ⤴️ Back-to-top floating button

## 📁 Project Structure

. ├─ index.html # Main page markup ├─ style.css # Theme, layout, components, responsive rules ├─ script.js # Dark mode, form logic, validation, submission └─ assets/ # (optional) Add screenshots here for README

## 🚀 Quick Start

- Open index.html directly in your browser
- Or use a local server (recommended for best experience)
  - VS Code → Live Server extension → “Open with Live Server”
  - Or: npx serve . (Node required)

## 🧩 How It’s Structured

- Header
  - Centered brand “Contact Us” with theme toggle to the right
- Main Layout
  - Left Column (equal width to right on desktop)
    - Get in Touch card (address, phone, email, hours, social)
    - Location card (Google Maps embed), same width, equal height with Get in Touch on desktop
  - Right Column
    - Contact Form card spanning both rows (matches combined left height)
Mobile order (top → bottom): Get in Touch → Location → Form

## ⚙️ Configuration

- Backend endpoint (optional)
  - In script.js, set FORM_ENDPOINT to your backend URL (Formspree, EmailJS, custom API, etc.)
  - Example:
    const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
- Map embed
  - Replace the iframe src in index.html with your place embed from Google Maps
- Theme color
  - Edit the meta name="theme-color" in index.html and the CSS variables in :root

## 🛠️ Customization

- Brand title in center
  - Already centered via grid in .site-header (brand in middle column, toggle on right)
- Colors and styling
  - Change CSS variables in style.css under :root and [data-theme="dark"]
    - --primary, --text, --bg, --surface, etc.
- Layout tweaks
  - The grid is defined in .contact-wrapper; desktop uses:
    "info form"
    "map  form"
  - To change spacing, adjust gap or container width

## 🔒 Accessibility

- Labels and inputs are connected with for/id
- aria-live region announces form status messages
- Focus-visible styles ensure keyboard navigation
- Color contrasts tuned for dark/light themes

## 🧪 Validations and UX

- HTML5 constraints (required, pattern, minlength/maxlength)
- Dynamic: phone becomes required if “Phone” is the preferred contact method
- Character counter for the message field
- Honeypot “company” field blocks simple bots
- Inline success/error alerts and a spinner on submit

## 🧰 Tech Stack

- HTML5 + CSS3 + JavaScript
- Font Awesome icons
- Google Fonts (Poppins)
- Normalize.css

## 📸 Screenshots

![image](https://github.com/MdSaifAli063/Contact-Us-Page/blob/079dbcc7235fc80e0af0a955931f30e6fb26ca67/Screenshot%202025-09-14%20020123.png)

## 📦 Deployment

- Static hosting works out of the box (no server needed unless you set FORM_ENDPOINT)
- Options:
  - GitHub Pages
  - Netlify (drag and drop)
  - Vercel
  - Any static host

## 🙌 Credits

- Icons: Font Awesome
- Fonts: Google Fonts (Poppins)
- Normalize: normalize.css
- Maps: Google Maps Embed

## 📄 License

MIT License — feel free to use, modify, and distribute. Replace with your preferred license if needed.

---

Made with ❤️ for great UX and accessibility.
