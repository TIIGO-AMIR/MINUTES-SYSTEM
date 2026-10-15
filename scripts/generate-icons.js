import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG with university brandmark (green background, white & gold M emblem)
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#123d2b" />
      <stop offset="100%" stop-color="#0c291d" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8d675" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Background with rounded corners -->
  <rect width="512" height="512" rx="108" fill="url(#grad)" />
  <!-- Inner border ring -->
  <rect x="24" y="24" width="464" height="464" rx="88" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-opacity="0.6" />
  
  <!-- Subtle document pages / minutes badge -->
  <g filter="url(#shadow)">
    <!-- Primary bold M for MRUMSA -->
    <path d="M128 390 V140 H182 L256 270 L330 140 H384 V390 H332 V234 L268 344 H244 L180 234 V390 Z" fill="#ffffff" />
    <!-- Subtitle bar -->
    <rect x="156" y="415" width="200" height="12" rx="6" fill="url(#goldGrad)" />
  </g>
</svg>`;

// Maskable icon with 15% safe padding (Android adaptive icon requires content in central 80% circle)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="mgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#123d2b" />
      <stop offset="100%" stop-color="#0a2419" />
    </linearGradient>
    <linearGradient id="mgold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8d675" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
  </defs>
  <!-- Full-bleed background -->
  <rect width="512" height="512" fill="url(#mgrad)" />
  <!-- Circle guide inside safe zone -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="url(#mgold)" stroke-width="5" stroke-opacity="0.35" />
  <!-- M emblem scaled inside safe zone -->
  <g transform="translate(40, 40) scale(0.84)">
    <path d="M140 375 V155 H188 L256 272 L324 155 H372 V375 H326 V240 L266 338 H246 L186 240 V375 Z" fill="#ffffff" />
    <rect x="170" y="398" width="172" height="12" rx="6" fill="url(#mgold)" />
  </g>
</svg>`;

async function run() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg);
  console.log('Saved icon.svg');

  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Saved pwa-512x512.png');

  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Saved pwa-192x192.png');

  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Saved pwa-maskable-512x512.png');

  await sharp(Buffer.from(standardSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Saved apple-touch-icon.png');

  await sharp(Buffer.from(standardSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Saved favicon.ico');
}

run().catch(console.error);
