import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function readText(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8').replace(/^\uFEFF/, '');
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function checkTripGenerator() {
  const content = readText('store/tripGenerator.ts');

  const requiredCities = ['москва', 'санкт-петербург', 'казань', 'сочи', 'калининград', 'владивосток', 'иркутск'];
  for (const city of requiredCities) {
    const cityRe = new RegExp(`['"]?${city}['"]?\\s*:\\s*\\[`);
    assert(cityRe.test(content), `CITY_PLACES is missing key: ${city}`);
  }

  const vladStart = content.indexOf('владивосток: [');
  const nextBlock = content.indexOf('],', vladStart);
  const vladBlock = vladStart >= 0 && nextBlock > vladStart ? content.slice(vladStart, nextBlock) : '';

  assert(vladBlock.length > 0, 'Unable to locate Vladivostok block in CITY_PLACES');
  if (vladBlock.length > 0) {
    assert(!/Эрмитаж/.test(vladBlock), 'Vladivostok block unexpectedly contains Эрмитаж');
    assert(/Токаревский маяк/.test(vladBlock), 'Vladivostok block is missing Токаревский маяк');
  }
}

function checkTripDetailTabs() {
  const content = readText('app/trip/[id].tsx');
  const requiredLabels = ["label: 'Маршрут'", "label: 'Транспорт'", "label: 'Отели'", "label: 'Бюджет'"];
  for (const label of requiredLabels) {
    assert(content.includes(label), `Trip detail tabs are missing ${label}`);
  }
}

function checkApiDb() {
  const dbRaw = readText('api/data/app-db.json');
  const db = JSON.parse(dbRaw);

  assert(Array.isArray(db.trips), 'api/data/app-db.json: trips must be an array');

  for (const row of db.trips || []) {
    try {
      const trip = JSON.parse(row.payload);
      const tripText = JSON.stringify(trip);
      assert(!tripText.includes('??????'), `Trip ${row.id} contains broken placeholder text`);

      if (trip.to === 'Владивосток') {
        const names = (trip.days || []).flatMap((d) => (d.places || []).map((p) => p.name));
        assert(!names.some((n) => /Эрмитаж/.test(String(n))), `Trip ${row.id} for Владивосток contains Эрмитаж`);
        assert(names.some((n) => /Токаревский маяк/.test(String(n))), `Trip ${row.id} for Владивосток missing Токаревский маяк`);
      }
    } catch (error) {
      errors.push(`Failed to parse trip payload ${row.id}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }
}

checkTripGenerator();
checkTripDetailTabs();
checkApiDb();

if (errors.length > 0) {
  console.error('Content smoke failed:');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

console.log('Content smoke passed');
