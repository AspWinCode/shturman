#!/usr/bin/env node
/**
 * generate-assets.js
 * Pure Node.js PNG asset generator — no external dependencies.
 * Generates: icon.png, adaptive-icon.png, splash.png, store-icon.png
 */

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// CRC32
// ---------------------------------------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ---------------------------------------------------------------------------
// PNG encoder
// ---------------------------------------------------------------------------
function encodePNG(width, height, pixels) {
  // pixels: Uint8Array of RGBA values, row-major

  // Build raw image data with filter byte (0 = None) per row
  const rowBytes = width * 4;
  const raw = Buffer.alloc((rowBytes + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (rowBytes + 1)] = 0; // filter type None
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = y * (rowBytes + 1) + 1 + x * 4;
      raw[dst]     = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
      raw[dst + 3] = pixels[src + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });

  function chunk(type, data) {
    const typeBytes = Buffer.from(type, 'ascii');
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([typeBytes, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
  }

  const IHDR_data = Buffer.alloc(13);
  IHDR_data.writeUInt32BE(width, 0);
  IHDR_data.writeUInt32BE(height, 4);
  IHDR_data[8] = 8;  // bit depth
  IHDR_data[9] = 6;  // RGBA colour type
  IHDR_data[10] = 0; // compression
  IHDR_data[11] = 0; // filter
  IHDR_data[12] = 0; // interlace

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', IHDR_data),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------------------
// Drawing primitives
// ---------------------------------------------------------------------------
function createCanvas(w, h) {
  return {
    w, h,
    px: new Uint8Array(w * h * 4), // RGBA all zeros (transparent)
  };
}

function setPixel(canvas, x, y, r, g, b, a = 255) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= canvas.w || y < 0 || y >= canvas.h) return;
  const i = (y * canvas.w + x) * 4;
  canvas.px[i]     = r;
  canvas.px[i + 1] = g;
  canvas.px[i + 2] = b;
  canvas.px[i + 3] = a;
}

function fillAll(canvas, r, g, b, a = 255) {
  for (let i = 0; i < canvas.w * canvas.h; i++) {
    canvas.px[i * 4]     = r;
    canvas.px[i * 4 + 1] = g;
    canvas.px[i * 4 + 2] = b;
    canvas.px[i * 4 + 3] = a;
  }
}

// Filled circle with anti-aliased edge
function fillCircle(canvas, cx, cy, radius, r, g, b) {
  const x0 = Math.max(0, Math.floor(cx - radius - 1));
  const x1 = Math.min(canvas.w - 1, Math.ceil(cx + radius + 1));
  const y0 = Math.max(0, Math.floor(cy - radius - 1));
  const y1 = Math.min(canvas.h - 1, Math.ceil(cy + radius + 1));

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.max(0, Math.min(1, radius - dist + 0.5));
      if (alpha > 0) {
        const a = Math.round(alpha * 255);
        blendPixel(canvas, x, y, r, g, b, a);
      }
    }
  }
}

// Ring (thick circle outline)
function fillRing(canvas, cx, cy, innerR, outerR, r, g, b) {
  const x0 = Math.max(0, Math.floor(cx - outerR - 1));
  const x1 = Math.min(canvas.w - 1, Math.ceil(cx + outerR + 1));
  const y0 = Math.max(0, Math.floor(cy - outerR - 1));
  const y1 = Math.min(canvas.h - 1, Math.ceil(cy + outerR + 1));

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const outerAlpha = Math.max(0, Math.min(1, outerR - dist + 0.5));
      const innerAlpha = Math.max(0, Math.min(1, dist - innerR + 0.5));
      const alpha = Math.min(outerAlpha, innerAlpha);
      if (alpha > 0) {
        blendPixel(canvas, x, y, r, g, b, Math.round(alpha * 255));
      }
    }
  }
}

// Blend pixel (over operator)
function blendPixel(canvas, x, y, r, g, b, a) {
  if (x < 0 || x >= canvas.w || y < 0 || y >= canvas.h) return;
  const i = (y * canvas.w + x) * 4;
  const bg_a = canvas.px[i + 3] / 255;
  const fg_a = a / 255;
  const out_a = fg_a + bg_a * (1 - fg_a);
  if (out_a === 0) return;
  canvas.px[i]     = Math.round((r * fg_a + canvas.px[i]     * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i + 1] = Math.round((g * fg_a + canvas.px[i + 1] * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i + 2] = Math.round((b * fg_a + canvas.px[i + 2] * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i + 3] = Math.round(out_a * 255);
}

// Thick line with anti-aliasing
function drawThickLine(canvas, x1, y1, x2, y2, thickness, r, g, b) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  const nx = -dy / len, ny = dx / len; // normal

  // Bounding box
  const hw = thickness / 2 + 1;
  const minX = Math.max(0, Math.floor(Math.min(x1, x2) - hw));
  const maxX = Math.min(canvas.w - 1, Math.ceil(Math.max(x1, x2) + hw));
  const minY = Math.max(0, Math.floor(Math.min(y1, y2) - hw));
  const maxY = Math.min(canvas.h - 1, Math.ceil(Math.max(y1, y2) + hw));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      // Distance from point to segment
      const px = x - x1, py = y - y1;
      const t = Math.max(0, Math.min(1, (px * dx + py * dy) / (len * len)));
      const closestX = x1 + t * dx, closestY = y1 + t * dy;
      const dist = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);
      const alpha = Math.max(0, Math.min(1, thickness / 2 - dist + 0.5));
      if (alpha > 0) {
        blendPixel(canvas, x, y, r, g, b, Math.round(alpha * 255));
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Ship's wheel (штурвал) drawing
// ---------------------------------------------------------------------------
function drawShipWheel(canvas, cx, cy, size, r, g, b) {
  const outerR  = size * 0.47;
  const ringW   = size * 0.065;
  const spokeR  = outerR - ringW / 2;
  const hubR    = size * 0.09;
  const hubHoleR = size * 0.04;
  const knobR   = size * 0.055;
  const spokeThick = size * 0.055;
  const numSpokes = 8;

  // Draw 8 spokes
  for (let i = 0; i < numSpokes; i++) {
    const angle = (i / numSpokes) * Math.PI * 2 - Math.PI / 2;
    const innerX = cx + Math.cos(angle) * (hubR + 2);
    const innerY = cy + Math.sin(angle) * (hubR + 2);
    const outerX = cx + Math.cos(angle) * spokeR;
    const outerY = cy + Math.sin(angle) * spokeR;
    drawThickLine(canvas, innerX, innerY, outerX, outerY, spokeThick, r, g, b);
  }

  // Outer ring
  fillRing(canvas, cx, cy, outerR - ringW, outerR, r, g, b);

  // Knobs at spoke ends on outer ring
  for (let i = 0; i < numSpokes; i++) {
    const angle = (i / numSpokes) * Math.PI * 2 - Math.PI / 2;
    const kx = cx + Math.cos(angle) * outerR;
    const ky = cy + Math.sin(angle) * outerR;
    fillCircle(canvas, kx, ky, knobR, r, g, b);
  }

  // Hub (solid)
  fillCircle(canvas, cx, cy, hubR, r, g, b);

  // Hub hole (cut out background color)
  // We draw the hole using the background colour
  // We'll let the caller decide — for solid bg, draw with bg color
  // For transparent bg, draw with transparent
  // Signal: return hubHoleR so caller can punch hole
  return { hubHoleR };
}

// ---------------------------------------------------------------------------
// Asset generators
// ---------------------------------------------------------------------------

// Navy + white wheel on solid navy (icon.png, store-icon.png)
function generateSolidIcon(w, h, bgR, bgG, bgB) {
  const canvas = createCanvas(w, h);
  fillAll(canvas, bgR, bgG, bgB);

  const cx = w / 2, cy = h / 2;
  const size = Math.min(w, h) * 0.72;
  const { hubHoleR } = drawShipWheel(canvas, cx, cy, size, 255, 255, 255);

  // Punch hub hole with background color
  fillCircle(canvas, cx, cy, hubHoleR, bgR, bgG, bgB);

  return encodePNG(w, h, canvas.px);
}

// Transparent bg + white wheel (adaptive-icon.png)
function generateAdaptiveIcon(w, h) {
  const canvas = createCanvas(w, h);
  // Transparent background — already zeroed

  const cx = w / 2, cy = h / 2;
  const size = Math.min(w, h) * 0.72;
  drawShipWheel(canvas, cx, cy, size, 255, 255, 255);
  // Hub hole stays transparent — already transparent

  return encodePNG(w, h, canvas.px);
}

// Splash screen — navy bg, centered wheel, app name text rendered as simple pixel art
function generateSplash(w, h, bgR, bgG, bgB) {
  const canvas = createCanvas(w, h);
  fillAll(canvas, bgR, bgG, bgB);

  // Wheel centered slightly above center
  const cx = w / 2;
  const cy = h * 0.42;
  const size = Math.min(w, h) * 0.38;
  const { hubHoleR } = drawShipWheel(canvas, cx, cy, size, 255, 255, 255);
  fillCircle(canvas, cx, cy, hubHoleR, bgR, bgG, bgB);

  // Accent dot below wheel
  const accentR = 0xe8, accentG = 0x47, accentB = 0x2b;
  fillCircle(canvas, cx, cy + size * 0.62, size * 0.04, accentR, accentG, accentB);

  return encodePNG(w, h, canvas.px);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const NAV_R = 0x1b, NAV_G = 0x3a, NAV_B = 0x6b; // #1B3A6B navy

console.log('Generating assets...');

const files = [
  { name: 'icon.png',          fn: () => generateSolidIcon(1024, 1024, NAV_R, NAV_G, NAV_B) },
  { name: 'store-icon.png',    fn: () => generateSolidIcon(512, 512, NAV_R, NAV_G, NAV_B) },
  { name: 'adaptive-icon.png', fn: () => generateAdaptiveIcon(1024, 1024) },
  { name: 'splash.png',        fn: () => generateSplash(1284, 2778, NAV_R, NAV_G, NAV_B) },
];

for (const { name, fn } of files) {
  const buf = fn();
  const dest = path.join(ASSETS_DIR, name);
  fs.writeFileSync(dest, buf);
  const kb = Math.round(buf.length / 1024);
  console.log(`  ✓ ${name}  (${kb} KB)`);
}

console.log('\nDone! All assets written to assets/');
