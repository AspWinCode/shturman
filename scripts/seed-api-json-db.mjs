import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { buildDemoTrips } = require('../api/demoSeed');

const DB_PATH = path.join(process.cwd(), 'api', 'data', 'app-db.json');

const raw = fs.readFileSync(DB_PATH, 'utf8');
const db = JSON.parse(raw);
const users = Array.isArray(db.users) ? db.users : [];
const demoUser = users.find((u) => String(u.email || '').toLowerCase() === 'demo@travelai.app');

if (!demoUser?.id) {
  throw new Error('Demo user (demo@travelai.app) not found in api/data/app-db.json');
}

const seedTrips = buildDemoTrips();

db.trips = seedTrips.map((trip) => ({
  id: trip.id,
  payload: JSON.stringify(trip),
  status: trip.status,
  start_date: trip.startDate,
  updated_at: new Date().toISOString(),
  userId: demoUser.id,
}));

if (!Array.isArray(db.auditLogs)) db.auditLogs = [];
if (!Array.isArray(db.refreshTokens)) db.refreshTokens = [];

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Seeded ${db.trips.length} API trips for demo user ${demoUser.email}`);
