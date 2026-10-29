# Om Thakur — Resume

HTML & CSS source files and compiled PDFs for Om Thakur's backend engineering resume.

## Versions Available

### 1. Main Resume (2-Page Full Version)
- **HTML Source**: [`resume.html`](resume.html)
- **Stylesheet**: [`resume.css`](resume.css)
- **Compiled PDF**: [`Om_Thakur_Resume.pdf`](Om_Thakur_Resume.pdf) (or [`Om_Thakur_Resume_2Page.pdf`](Om_Thakur_Resume_2Page.pdf))
- **Content**: Complete work experience, key impact metrics, comprehensive technical skills, all 4 selected projects, education, certification, and volunteering.

### 2. Single-Page Resume (1-Page Condensed Version)
- **HTML Source**: [`resume-1page.html`](resume-1page.html)
- **Stylesheet**: [`resume-1page.css`](resume-1page.css)
- **Compiled PDF**: [`Om_Thakur_Resume_1Page.pdf`](Om_Thakur_Resume_1Page.pdf)
- **Content**: High-density 1-page layout formatted specifically for standard single-page applications.

## Typography
Fonts are self-hosted in `fonts/`:
- **IBM Plex Serif**: Name, headings, and key metric figures
- **IBM Plex Sans**: Body text and descriptions
- **IBM Plex Mono**: Dates, contact details, and metadata

## Generating / Printing PDFs

To compile locally using Google Chrome / Chromium in headless mode:

```bash
# Main 2-Page Resume
chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="Om_Thakur_Resume.pdf" resume.html

# Single-Page Resume
chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="Om_Thakur_Resume_1Page.pdf" resume-1page.html
```

Or open `resume.html` or `resume-1page.html` in any modern browser and click **Print / Save PDF** (or press `Ctrl + P`).
