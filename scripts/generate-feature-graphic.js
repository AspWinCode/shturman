#!/usr/bin/env node
/**
 * generate-feature-graphic.js
 * Creates assets/feature-graphic.png (1024×500) for RuStore banner.
 * Pure Node.js — no external dependencies.
 */

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// ── CRC32 ──────────────────────────────────────────────────────────────────
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

// ── PNG encoder ────────────────────────────────────────────────────────────
function encodePNG(w, h, pixels) {
  const rowBytes = w * 4;
  const raw = Buffer.alloc((rowBytes + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (rowBytes + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const src = (y * w + x) * 4;
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
    const crc  = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Drawing ────────────────────────────────────────────────────────────────
function createCanvas(w, h, r = 0, g = 0, b = 0, a = 255) {
  const px = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    px[i*4]=r; px[i*4+1]=g; px[i*4+2]=b; px[i*4+3]=a;
  }
  return { w, h, px };
}

function blend(canvas, x, y, r, g, b, a) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || x >= canvas.w || y < 0 || y >= canvas.h) return;
  const i = (y * canvas.w + x) * 4;
  const bg_a = canvas.px[i+3] / 255;
  const fg_a = a / 255;
  const out_a = fg_a + bg_a * (1 - fg_a);
  if (out_a === 0) return;
  canvas.px[i]   = Math.round((r * fg_a + canvas.px[i]   * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i+1] = Math.round((g * fg_a + canvas.px[i+1] * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i+2] = Math.round((b * fg_a + canvas.px[i+2] * bg_a * (1 - fg_a)) / out_a);
  canvas.px[i+3] = Math.round(out_a * 255);
}

function circle(canvas, cx, cy, radius, r, g, b) {
  const x0 = Math.max(0, Math.floor(cx - radius - 1));
  const x1 = Math.min(canvas.w - 1, Math.ceil(cx + radius + 1));
  const y0 = Math.max(0, Math.floor(cy - radius - 1));
  const y1 = Math.min(canvas.h - 1, Math.ceil(cy + radius + 1));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dist = Math.sqrt((x-cx)**2 + (y-cy)**2);
      const a = Math.max(0, Math.min(1, radius - dist + 0.5));
      if (a > 0) blend(canvas, x, y, r, g, b, Math.round(a * 255));
    }
  }
}

function ring(canvas, cx, cy, innerR, outerR, r, g, b) {
  const x0 = Math.max(0, Math.floor(cx - outerR - 1));
  const x1 = Math.min(canvas.w - 1, Math.ceil(cx + outerR + 1));
  const y0 = Math.max(0, Math.floor(cy - outerR - 1));
  const y1 = Math.min(canvas.h - 1, Math.ceil(cy + outerR + 1));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dist = Math.sqrt((x-cx)**2 + (y-cy)**2);
      const a = Math.min(
        Math.max(0, Math.min(1, outerR - dist + 0.5)),
        Math.max(0, Math.min(1, dist - innerR + 0.5))
      );
      if (a > 0) blend(canvas, x, y, r, g, b, Math.round(a * 255));
    }
  }
}

function thickLine(canvas, x1, y1, x2, y2, thickness, r, g, b) {
  const dx = x2-x1, dy = y2-y1;
  const len = Math.sqrt(dx*dx + dy*dy);
  if (len === 0) return;
  const hw = thickness / 2 + 1;
  const minX = Math.max(0, Math.floor(Math.min(x1,x2) - hw));
  const maxX = Math.min(canvas.w-1, Math.ceil(Math.max(x1,x2) + hw));
  const minY = Math.max(0, Math.floor(Math.min(y1,y2) - hw));
  const maxY = Math.min(canvas.h-1, Math.ceil(Math.max(y1,y2) + hw));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const px = x-x1, py = y-y1;
      const t  = Math.max(0, Math.min(1, (px*dx + py*dy)/(len*len)));
      const dist = Math.sqrt((x - (x1+t*dx))**2 + (y - (y1+t*dy))**2);
      const a = Math.max(0, Math.min(1, thickness/2 - dist + 0.5));
      if (a > 0) blend(canvas, x, y, r, g, b, Math.round(a*255));
    }
  }
}

function wheel(canvas, cx, cy, size, r, g, b) {
  const outerR  = size * 0.47;
  const ringW   = size * 0.065;
  const spokeR  = outerR - ringW / 2;
  const hubR    = size * 0.09;
  const hubHoleR = size * 0.04;
  const knobR   = size * 0.055;
  const spokeThick = size * 0.055;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    thickLine(canvas,
      cx + Math.cos(angle) * (hubR + 2), cy + Math.sin(angle) * (hubR + 2),
      cx + Math.cos(angle) * spokeR,     cy + Math.sin(angle) * spokeR,
      spokeThick, r, g, b);
  }
  ring(canvas, cx, cy, outerR - ringW, outerR, r, g, b);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    circle(canvas, cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR, knobR, r, g, b);
  }
  circle(canvas, cx, cy, hubR, r, g, b);
  return hubHoleR;
}

// ── Gradient fill (navy → darker navy left to right) ──────────────────────
function gradientFill(canvas) {
  // #1B3A6B → #0f2347
  for (let y = 0; y < canvas.h; y++) {
    for (let x = 0; x < canvas.w; x++) {
      const t = x / canvas.w;
      const r = Math.round(0x1b + (0x0f - 0x1b) * t);
      const g = Math.round(0x3a + (0x23 - 0x3a) * t);
      const b = Math.round(0x6b + (0x47 - 0x6b) * t);
      const i = (y * canvas.w + x) * 4;
      canvas.px[i]   = r;
      canvas.px[i+1] = g;
      canvas.px[i+2] = b;
      canvas.px[i+3] = 255;
    }
  }
}

// Draw subtle grid of dots as texture
function dotTexture(canvas, spacing, dotR, r, g, b, a) {
  for (let y = spacing/2; y < canvas.h; y += spacing) {
    for (let x = spacing/2; x < canvas.w; x += spacing) {
      circle(canvas, x, y, dotR, r, g, b);
      // Overwrite alpha to be subtle
      const i = (Math.round(y) * canvas.w + Math.round(x)) * 4;
      if (canvas.px[i+3] > 0) canvas.px[i+3] = a;
    }
  }
}

// ── Accent stripe ──────────────────────────────────────────────────────────
function accentStripe(canvas, y, height, r, g, b) {
  for (let row = Math.max(0, y); row < Math.min(canvas.h, y + height); row++) {
    for (let x = 0; x < canvas.w; x++) {
      const i = (row * canvas.w + x) * 4;
      canvas.px[i]   = r;
      canvas.px[i+1] = g;
      canvas.px[i+2] = b;
      canvas.px[i+3] = 255;
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────
const W = 1024, H = 500;
const canvas = createCanvas(W, H);
gradientFill(canvas);

// Subtle dot grid texture
// (very faint — we'll draw dots manually with low alpha by painting then fixing alpha)
for (let gy = 30; gy < H; gy += 40) {
  for (let gx = 30; gx < W; gx += 40) {
    blend(canvas, gx, gy, 255, 255, 255, 18);
  }
}

// Red accent stripe at bottom
accentStripe(canvas, H - 8, 8, 0xe8, 0x47, 0x2b);

// Large ship wheel — left side
const wSize = 340;
const wCx = 240, wCy = H / 2 + 10;
const holeR = wheel(canvas, wCx, wCy, wSize, 255, 255, 255);

// Punch hub hole (restore gradient colour at that point)
for (let y = Math.floor(wCy - holeR - 2); y <= Math.ceil(wCy + holeR + 2); y++) {
  for (let x = Math.floor(wCx - holeR - 2); x <= Math.ceil(wCx + holeR + 2); x++) {
    const dist = Math.sqrt((x-wCx)**2 + (y-wCy)**2);
    const a = Math.max(0, Math.min(1, holeR - dist + 0.5));
    if (a > 0) {
      const t = x / W;
      const r = Math.round(0x1b + (0x0f - 0x1b) * t);
      const g = Math.round(0x3a + (0x23 - 0x3a) * t);
      const b = Math.round(0x6b + (0x47 - 0x6b) * t);
      blend(canvas, x, y, r, g, b, Math.round(a * 255));
    }
  }
}

// Right side: app name text rendered as thick lines (pixel art style)
// We'll draw 3 highlight lines suggesting UI cards
const cardX = 520, cardW = 440;
// Card 1
roundRect(canvas, cardX, 70, cardW, 100, 16, 255, 255, 255, 18);
// Card 2
roundRect(canvas, cardX, 192, cardW, 100, 16, 255, 255, 255, 14);
// Card 3
roundRect(canvas, cardX, 314, cardW, 100, 16, 255, 255, 255, 10);

// Small accent dot on card 1
circle(canvas, cardX + 36, 70 + 50, 20, 0xe8, 0x47, 0x2b);
circle(canvas, cardX + 36, 192 + 50, 20, 0x4c, 0xaf, 0x50); // green
circle(canvas, cardX + 36, 314 + 50, 20, 0x21, 0x96, 0xf3); // blue

// Horizontal lines inside cards (simulate text)
for (let card = 0; card < 3; card++) {
  const cy2 = [70, 192, 314][card];
  thickLine(canvas, cardX + 70, cy2 + 36, cardX + cardW - 32, cy2 + 36, 6, 255, 255, 255);
  thickLine(canvas, cardX + 70, cy2 + 58, cardX + cardW - 80, cy2 + 58, 4, 255, 255, 255);
  thickLine(canvas, cardX + 70, cy2 + 76, cardX + cardW - 110, cy2 + 76, 4, 255, 255, 255);
  // Fix alpha of those lines to be subtle
}

// App name: draw "ШТУРМАН" as a bold white label bar at top-right
thickLine(canvas, cardX, 30, cardX + 200, 30, 3, 0xe8, 0x47, 0x2b);

function roundRect(canvas, x, y, w, h, radius, r, g, b, a) {
  // Approximate: filled rect with blended alpha
  for (let row = y; row < y + h; row++) {
    for (let col = x; col < x + w; col++) {
      if (row < 0 || row >= canvas.h || col < 0 || col >= canvas.w) continue;
      blend(canvas, col, row, r, g, b, a);
    }
  }
}

const dest = path.join(__dirname, '..', 'assets', 'feature-graphic.png');
fs.writeFileSync(dest, encodePNG(W, H, canvas.px));
console.log(`✓ feature-graphic.png written (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
