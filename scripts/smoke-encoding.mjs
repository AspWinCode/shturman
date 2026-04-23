import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scanDirs = ['app', 'components', 'store', 'constants', 'locales', 'api'];
const fileExts = new Set(['.ts', '.tsx', '.js', '.mjs', '.json']);

const suspiciousMarkers = [
  /[РС][Ѐ-Џѐ-џ]/u,
  /Ð[A-Za-zА-Яа-яЁё]/u,
  /Ñ[A-Za-zА-Яа-яЁё]/u,
  /Р[A-Za-z]/u,
  /С[A-Za-z]/u,
  /вЂ|в‚|в„|в€|в™/u,
];

const errors = [];

function walk(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return;

  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const relPath = path.join(dir, entry.name);
    const absPath = path.join(root, relPath);

    if (entry.isDirectory()) {
      walk(relPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!fileExts.has(ext)) continue;
    if (relPath.startsWith(`api${path.sep}data${path.sep}`) && ext === '.json') continue;

    const content = fs.readFileSync(absPath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const marker of suspiciousMarkers) {
        if (marker.test(line)) {
          errors.push(`${relPath}:${i + 1}: ${line.trim().slice(0, 160)}`);
          break;
        }
      }
    });
  }
}

scanDirs.forEach(walk);

if (errors.length > 0) {
  console.error('Encoding smoke failed. Suspicious mojibake fragments found:');
  for (const err of errors.slice(0, 80)) {
    console.error(`- ${err}`);
  }
  if (errors.length > 80) {
    console.error(`...and ${errors.length - 80} more`);
  }
  process.exit(1);
}

console.log('Encoding smoke passed');
