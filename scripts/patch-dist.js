#!/usr/bin/env node
/**
 * Патч dist/ после npx expo export --platform web
 * Вставляет @font-face для Ionicons во все HTML-файлы
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const distDir = path.join(__dirname, '../dist');

// Найти актуальный хэш Ionicons TTF
const ttfFiles = glob.sync('**/Ionicons.*.ttf', { cwd: distDir });
if (ttfFiles.length === 0) {
  console.error('Ionicons TTF not found in dist!');
  process.exit(1);
}

const fontRelPath = '/' + ttfFiles[0].replace(/\\/g, '/');
console.log('Found font:', fontRelPath);

const css = `<style>@font-face{font-family:"Ionicons";src:url("${fontRelPath}") format("truetype");font-display:block;}</style>`;

const htmlFiles = glob.sync('**/*.html', { cwd: distDir });
let patched = 0;

for (const file of htmlFiles) {
  const fullPath = path.join(distDir, file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  if (!content.includes('Ionicons') || content.includes('@font-face')) {
    // Inject if not already present
    if (!content.includes('@font-face{font-family:"Ionicons"')) {
      content = content.replace('</head>', css + '</head>');
      fs.writeFileSync(fullPath, content, 'utf-8');
      patched++;
    }
  }
}

console.log(`Patched ${patched}/${htmlFiles.length} HTML files`);
