/**
 * Generator for Om Thakur's LinkedIn Profile Banner
 * Outputs:
 *  - linkedin/linkedin-banner.svg (1584 x 396 vector)
 *  - linkedin/linkedin-banner.png (1584 x 396 raster)
 *  - linkedin/linkedin-banner@2x.png (3168 x 792 ultra high-DPI)
 *
 * Safe-zone aware: Left avatar clearance zone (x: 0-280, y: 250-396) kept free of text.
 * Theme: Monograph editorial palette matching omthakur.in
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;

const C = {
  paper: "#FAF6F1",
  card: "#FDFCFA",
  ivory: "#F4EDE2",
  sand: "#EDE4D9",
  parchment: "#E2D5C6",
  rule: "#D4C3AF",
  borderDark: "#C4AF98",
  ink: "#1A1816",
  charcoal: "#2C2825",
  body: "#3A342E",
  muted: "#5A524A",
  terracotta: "#9E3D2B",
  ember: "#E07A5F",
  burgundy: "#7A2E20",
  olive: "#566449",
  mist: "#A89F91",
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function buildBannerSvg() {
  const W = 1584;
  const H = 396;

  const CSS = `
text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-rendering: geometricPrecision; -webkit-font-smoothing: antialiased; }
.serif { font-family: "Playfair Display", Georgia, "Iowan Old Style", "Apple Garamond", serif; }
.mono { font-family: "Geist Mono", "JetBrains Mono", "SF Mono", Consolas, Menlo, monospace; }
.blink { animation: blink 1.1s step-end infinite; }
@keyframes blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
`;

  // Right card coordinates
  const cardX = 992;
  const cardY = 32;
  const cardW = 544;
  const cardH = 332;

  // Telemetry items for right card
  const telemetry = [
    {
      title: "Async Message-Queue Sync",
      sub: "FLEXBASE · POLLING CRONS ELIMINATED",
      pct: 0.96,
      color: C.terracotta,
      metric: "15m → 4s",
      delta: "−99.5%",
    },
    {
      title: "Real-Time Voice AI Pipeline",
      sub: "KRISHORA · PIPECAT · EXOTEL · CUDA",
      pct: 0.72,
      color: C.olive,
      metric: "~700 ms",
      delta: "GPU STREAM",
    },
    {
      title: "Stateless SVG Edge API",
      sub: "DEVPIC · EDGE RUNTIME · ZERO DB",
      pct: 0.88,
      color: C.burgundy,
      metric: "< 10 ms",
      delta: "SUB-10MS TTFB",
    },
  ];

  const telemRows = telemetry
    .map((item, idx) => {
      const y = cardY + 76 + idx * 62;
      const trackW = 200;
      const barW = (trackW * item.pct).toFixed(0);
      return `
      <!-- Row ${idx + 1} -->
      <text x="${cardX + 24}" y="${y + 14}" class="serif" font-size="14.5" font-weight="800" fill="${C.ink}">${esc(item.title)}</text>
      <text x="${cardX + 24}" y="${y + 28}" class="mono" font-size="9.5" font-weight="700" fill="${C.muted}" letter-spacing="0.6">${esc(item.sub)}</text>

      <!-- Progress bar -->
      <rect x="${cardX + 24}" y="${y + 36}" width="${trackW}" height="7" rx="3.5" fill="${C.ivory}"/>
      <rect x="${cardX + 24}" y="${y + 36}" width="${barW}" height="7" rx="3.5" fill="${item.color}"/>

      <!-- Metric badge on right of card -->
      <text x="${cardX + cardW - 24}" y="${y + 17}" class="serif" font-size="19" font-weight="900" fill="${item.color}" text-anchor="end">${esc(item.metric)}</text>
      <text x="${cardX + cardW - 24}" y="${y + 33}" class="mono" font-size="10" font-weight="700" fill="${C.muted}" letter-spacing="0.5" text-anchor="end">${esc(item.delta)}</text>
      ${idx < 2 ? `<line x1="${cardX + 24}" y1="${y + 53}" x2="${cardX + cardW - 24}" y2="${y + 53}" stroke="${C.parchment}" stroke-width="1" stroke-dasharray="2 4"/>` : ""}
    `;
    })
    .join("");

  // Bottom chips on left side (starting at x: 280 to clear avatar with safe margin)
  const chips = [
    { big: "15m → 4s", small: "QUEUE SYNC", w: 190 },
    { big: "~700 ms", small: "VOICE PIPELINE", w: 214 },
    { big: "SoWeBuild.in", small: "STUDIO &amp; AGENCY", w: 236 },
  ];
  let chipX = 280;
  const chipSvg = chips
    .map((c) => {
      const g = `
      <g>
        <rect x="${chipX}" y="268" width="${c.w}" height="38" rx="7" fill="${C.card}" stroke="${C.parchment}" stroke-width="1.2"/>
        <text x="${chipX + 16}" y="292">
          <tspan class="serif" font-size="16" font-weight="800" fill="${C.terracotta}">${c.big}</tspan>
          <tspan dx="10" class="mono" font-size="10.5" font-weight="600" fill="${C.muted}" letter-spacing="0.5">${c.small}</tspan>
        </text>
      </g>`;
      chipX += c.w + 12;
      return g;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <title>Om Thakur — LinkedIn Banner</title>
  <defs>
    <style>${CSS}</style>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#2C2318" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Canvas & Monograph Background -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="0" fill="none" stroke="${C.parchment}" stroke-width="2"/>
  <rect x="12" y="12" width="${W - 24}" height="${H - 24}" rx="4" fill="none" stroke="${C.rule}" stroke-opacity="0.6" stroke-dasharray="1 5" stroke-linecap="round"/>

  <!-- Left decorative subtle seal (sitting behind avatar zone as an watermark) -->
  <g opacity="0.14" transform="translate(136, 320)">
    <circle cx="0" cy="0" r="88" fill="none" stroke="${C.terracotta}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle cx="0" cy="0" r="74" fill="none" stroke="${C.ink}" stroke-width="1"/>
    <text x="0" y="-8" class="mono" font-size="11" font-weight="700" fill="${C.ink}" letter-spacing="2" text-anchor="middle">FOUNDING ENG</text>
    <text x="0" y="12" class="mono" font-size="9" font-weight="600" fill="${C.terracotta}" letter-spacing="1.5" text-anchor="middle">KRISHORA · SOWEBUILD</text>
  </g>

  <!-- ── TOP MASTHEAD BANNER ── -->
  <text x="48" y="44" class="serif" font-size="15" font-weight="800" fill="${C.ink}" letter-spacing="3.2">OM THAKUR</text>
  <rect x="180" y="37" width="5.5" height="5.5" fill="${C.terracotta}" transform="rotate(45 183 40)"/>
  <text x="198" y="44" class="mono" font-size="11" font-weight="700" fill="${C.terracotta}" letter-spacing="2.2">ENGINEERING MONOGRAPH</text>
  <rect x="410" y="37" width="5.5" height="5.5" fill="${C.muted}" transform="rotate(45 413 40)"/>
  <text x="428" y="44" class="mono" font-size="11" font-weight="600" fill="${C.muted}" letter-spacing="2">VOLUME I · MMXXVI</text>

  <line x1="48" y1="56" x2="948" y2="56" stroke="${C.parchment}" stroke-width="1"/>

  <!-- ── HERO IDENTITY & SPECIALIZATION ── -->
  <text x="48" y="96" class="mono" font-size="12.5" font-weight="700" fill="${C.terracotta}" letter-spacing="2.4">FOUNDING SOFTWARE ENGINEER @ KRISHORA  ·  FOUNDER @ SOWEBUILD.IN</text>

  <!-- Name & Tagline -->
  <text x="46" y="162" class="serif" font-size="58" font-weight="900" fill="${C.ink}" letter-spacing="-1">Om Thakur<tspan fill="${C.terracotta}">.</tspan></text>
  <line x1="48" y1="178" x2="340" y2="178" stroke="${C.terracotta}" stroke-width="2.5"/>
  <text x="48" y="214" class="serif" font-size="25" font-style="italic" fill="${C.terracotta}">Scalable Backends &amp; Distributed Systems</text>

  <!-- Terminal whoami prompt line -->
  <text x="48" y="248" class="mono" font-size="14" fill="${C.body}">
    <tspan fill="${C.terracotta}" font-weight="700">$ </tspan>whoami <tspan fill="${C.terracotta}">→</tspan> High-concurrency APIs, message queues &amp; real-time voice pipelines<tspan fill="${C.terracotta}" class="blink" font-weight="700"> ▋</tspan>
  </text>

  <!-- ── 3 METRIC CHIPS (Offset to x: 300 so clear of avatar) ── -->
  ${chipSvg}

  <!-- ── LOCATION & AVAILABILITY STATUS (Offset to x: 280) ── -->
  <g transform="translate(280, 336)">
    <circle cx="8" cy="8" r="4" fill="${C.olive}"/>
    <circle cx="8" cy="8" r="4" fill="none" stroke="${C.olive}" stroke-width="1.6" opacity="0.6"/>
    <text x="24" y="12" class="mono" font-size="11" font-weight="600" fill="${C.muted}" letter-spacing="1.2">
      MUMBAI, IN (IST UTC+5:30)  ·  OPEN TO BACKEND &amp; FOUNDING ROLES  ·  CONSULTING VIA SOWEBUILD.IN
    </text>
  </g>

  <!-- ── RIGHT SPECIMEN CARD (HARDCOVER ARCHITECTURE LEDGER) ── -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="9" fill="${C.card}" stroke="${C.parchment}" stroke-width="1.4" filter="url(#cardShadow)"/>
  <rect x="${cardX + 8}" y="${cardY + 8}" width="${cardW - 16}" height="${cardH - 16}" rx="6" fill="none" stroke="${C.sand}" stroke-width="1" stroke-dasharray="1 4"/>

  <!-- Card Masthead -->
  <text x="${cardX + 24}" y="${cardY + 34}" class="mono" font-size="10.5" font-weight="700" fill="${C.terracotta}" letter-spacing="2.2">PRODUCTION BENCHMARKS &amp; TELEMETRY</text>
  <text x="${cardX + cardW - 24}" y="${cardY + 34}" class="mono" font-size="10" font-weight="700" fill="${C.olive}" letter-spacing="1.6" text-anchor="end">LIVE SIGNALS</text>
  <text x="${cardX + 24}" y="${cardY + 60}" class="serif" font-size="21" font-weight="800" fill="${C.ink}">Verified Production Systems</text>
  <line x1="${cardX + 24}" y1="${cardY + 70}" x2="${cardX + cardW - 24}" y2="${cardY + 70}" stroke="${C.parchment}" stroke-width="1.2"/>

  <!-- Telemetry Rows -->
  ${telemRows}

  <!-- Card Footer: Tech Stack Pills & URLs -->
  <line x1="${cardX + 24}" y1="${cardY + 276}" x2="${cardX + cardW - 24}" y2="${cardY + 276}" stroke="${C.parchment}" stroke-width="1"/>
  <text x="${cardX + 24}" y="${cardY + 302}" class="mono" font-size="10.5" font-weight="700" fill="${C.muted}" letter-spacing="1.1">
    NODE.JS · TYPESCRIPT · PYTHON · KOTLIN · POSTGRESQL · REDIS
  </text>
  <text x="${cardX + cardW - 24}" y="${cardY + 302}" class="mono" font-size="11" font-weight="700" fill="${C.terracotta}" letter-spacing="1.5" text-anchor="end">
    OMTHAKUR.IN ↗
  </text>
</svg>`;
}

async function run() {
  console.log("Generating Om Thakur's LinkedIn banner assets...");

  const svgStr = buildBannerSvg();
  const svgPath = join(OUT_DIR, "linkedin-banner.svg");
  const png1xPath = join(OUT_DIR, "linkedin-banner.png");
  const png2xPath = join(OUT_DIR, "linkedin-banner@2x.png");

  // 1. Write SVG
  writeFileSync(svgPath, svgStr, "utf8");
  console.log("  ✓ linkedin/linkedin-banner.svg (1584 x 396)");

  // 2. Render standard 1x PNG (1584 x 396)
  await sharp(Buffer.from(svgStr), { density: 72 })
    .resize(1584, 396)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(png1xPath);
  console.log("  ✓ linkedin/linkedin-banner.png (1584 x 396)");

  // 3. Render Retina 2x PNG (3168 x 792) for ultra-sharp high-DPI displays
  await sharp(Buffer.from(svgStr), { density: 144 })
    .resize(3168, 792)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(png2xPath);
  console.log("  ✓ linkedin/linkedin-banner@2x.png (3168 x 792 high-DPI)");

  console.log("Banner generation complete!");
}

run().catch((err) => {
  console.error("Error generating banner:", err);
  process.exit(1);
});
