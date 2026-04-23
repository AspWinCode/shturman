import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

function readJson(relPath) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    errors.push(`Missing file: ${relPath}`);
    return null;
  }
  try {
    const raw = fs.readFileSync(full, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(raw);
  } catch (error) {
    errors.push(`Invalid JSON in ${relPath}: ${error instanceof Error ? error.message : 'unknown error'}`);
    return null;
  }
}

function readEnvKeys(relPath) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    errors.push(`Missing file: ${relPath}`);
    return new Set();
  }
  const raw = fs.readFileSync(full, 'utf8');
  const keys = new Set();
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    keys.add(trimmed.slice(0, eq).trim());
  }
  return keys;
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function warn(condition, message) {
  if (!condition) warnings.push(message);
}

function checkAppJson() {
  const appJson = readJson('app.json');
  if (!appJson?.expo) return;
  const expo = appJson.expo;

  assert(typeof expo.name === 'string' && expo.name.trim().length > 0, 'app.json: expo.name is required');
  assert(typeof expo.slug === 'string' && expo.slug.trim().length > 0, 'app.json: expo.slug is required');
  assert(typeof expo.scheme === 'string' && expo.scheme.trim().length > 0, 'app.json: expo.scheme is required');
  assert(typeof expo.version === 'string' && expo.version.trim().length > 0, 'app.json: expo.version is required');

  assert(typeof expo.ios?.bundleIdentifier === 'string' && expo.ios.bundleIdentifier.trim().length > 0,
    'app.json: expo.ios.bundleIdentifier is required');
  assert(typeof expo.android?.package === 'string' && expo.android.package.trim().length > 0,
    'app.json: expo.android.package is required');
  assert(Number.isInteger(expo.android?.versionCode), 'app.json: expo.android.versionCode must be integer');
  assert(typeof expo.ios?.buildNumber === 'string' && expo.ios.buildNumber.trim().length > 0,
    'app.json: expo.ios.buildNumber is required');

  warn(!String(expo.ios?.bundleIdentifier || '').includes('travelai'),
    'Branding warning: iOS bundleIdentifier still contains "travelai"');
  warn(!String(expo.android?.package || '').includes('travelai'),
    'Branding warning: Android package still contains "travelai"');
}

function checkEasJson() {
  const eas = readJson('eas.json');
  if (!eas) return;

  const profiles = eas.build || {};
  for (const required of ['development', 'preview', 'production']) {
    assert(Boolean(profiles[required]), `eas.json: missing build profile "${required}"`);
  }

  const productionEnv = profiles.production?.env || {};
  assert(productionEnv.EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS === 'false',
    'eas.json production: EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS must be "false"');
  assert(productionEnv.EXPO_PUBLIC_ENABLE_DEMO_RESET === 'false',
    'eas.json production: EXPO_PUBLIC_ENABLE_DEMO_RESET must be "false"');
}

function checkEnvExamples() {
  const webEnv = readEnvKeys('.env.example');
  const apiEnv = readEnvKeys('api/.env.example');

  const requiredPublic = [
    'EXPO_PUBLIC_AUTH_API_URL',
    'EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS',
    'EXPO_PUBLIC_ENABLE_DEMO_RESET',
  ];
  const requiredApi = [
    'AUTH_API_PORT',
    'AUTH_API_HOST',
    'AUTH_JWT_SECRET',
    'YANDEX_RASP_API_KEY',
    'OSTROVOK_KEY_ID',
    'OSTROVOK_API_KEY',
    'OPENAI_API_KEY',
  ];

  for (const key of requiredPublic) {
    assert(webEnv.has(key), `.env.example: missing ${key}`);
  }
  for (const key of requiredApi) {
    assert(apiEnv.has(key), `api/.env.example: missing ${key}`);
  }
}

checkAppJson();
checkEasJson();
checkEnvExamples();

if (warnings.length > 0) {
  console.warn('Preflight warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error('Mobile preflight failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Mobile preflight passed');
