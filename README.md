# Om Thakur · Resume, Social & Profile Kit

> Canonical repository for Om Thakur's backend engineering resumes, LinkedIn assets, and social profiles.  
> Matches the warm editorial aesthetic of the **Engineering Monograph** at [omthakur.in](https://omthakur.in).

---

## 📑 1. Engineering Resumes

Compiled from pure semantic HTML & CSS with self-hosted IBM Plex typography.

### 📄 Main Resume (2-Page Full Version)
- **Compiled PDF**: [`Om_Thakur_Resume.pdf`](Om_Thakur_Resume.pdf) (or [`Om_Thakur_Resume_2Page.pdf`](Om_Thakur_Resume_2Page.pdf))
- **HTML Source**: [`resume.html`](resume.html)
- **Stylesheet**: [`resume.css`](resume.css)
- **Scope**: Comprehensive work chronology (Krishora Technologies, CIARL, Sumeru), verified production benchmarks, technical skills breakdown, all 4 selected projects, university distinction, and volunteering.

### 📄 Condensed Resume (1-Page Fast-Read)
- **Compiled PDF**: [`Om_Thakur_Resume_1Page.pdf`](Om_Thakur_Resume_1Page.pdf)
- **HTML Source**: [`resume-1page.html`](resume-1page.html)
- **Stylesheet**: [`resume-1page.css`](resume-1page.css)
- **Scope**: High-density 1-page layout formatted specifically for single-page applications and quick executive reviews.

### 🖨️ Compiling / Printing PDFs Locally
```bash
# Main 2-Page Resume
chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="Om_Thakur_Resume.pdf" resume.html

# Single-Page Resume
chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="Om_Thakur_Resume_1Page.pdf" resume-1page.html
```

---

## 👔 2. LinkedIn Profile Kit (`linkedin/`)

All assets for an elite, high-conversion LinkedIn profile matching the **Engineering Monograph** aesthetic.

👉 **Complete Copy Guide**: [`linkedin/LINKEDIN_PROFILE.md`](linkedin/LINKEDIN_PROFILE.md)  
*(Includes 3 headline options under 220 chars, complete formatted "About" bio, experience bullet points, and featured links)*

### 🖼️ Profile Banners (Pre-calibrated Safe-Zone)
Pre-calculated to leave the bottom-left avatar obstruction zone completely free of text or badges:

| Asset | Format | Resolution | Recommended Use |
| :--- | :--- | :--- | :--- |
| [`linkedin/linkedin-banner@2x.png`](linkedin/linkedin-banner@2x.png) | PNG | 3168 × 792 px | **Best choice** — ultra-crisp Retina / high-DPI |
| [`linkedin/linkedin-banner.png`](linkedin/linkedin-banner.png) | PNG | 1584 × 396 px | Standard 1x LinkedIn upload |
| [`linkedin/linkedin-banner.svg`](linkedin/linkedin-banner.svg) | SVG | Vector | Master vector source |
| [`linkedin/build-linkedin.mjs`](linkedin/build-linkedin.mjs) | Node / Sharp | Script | Re-renders SVG and PNG assets |

---

## 🌐 3. Online Profiles & Identity

| Property | Description | URL |
| :--- | :--- | :--- |
| **Engineering Monograph** | Interactive 3D portfolio & production telemetry | [omthakur.in](https://omthakur.in) |
| **Digital Engineering Studio** | Agency building high-performance websites & software | [sowebuild.in](https://sowebuild.in) |
| **GitHub** | Open source systems, REST APIs & agents | [github.com/MonsterFlick](https://github.com/MonsterFlick) |
| **LinkedIn** | Professional updates & career chronology | [linkedin.com/in/omthakur2366](https://linkedin.com/in/omthakur2366) |
| **Direct Contact** | Engineering correspondence | [thakurom525@gmail.com](mailto:thakurom525@gmail.com) |
