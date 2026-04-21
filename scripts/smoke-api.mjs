const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';

async function request(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { ok: false, message: 'Invalid JSON response' };
  }

  if (!res.ok) {
    throw new Error(`${init.method || 'GET'} ${path} failed: ${res.status} ${data?.message || ''}`.trim());
  }

  return data;
}

function randomEmail() {
  return `smoke_${Date.now()}_${Math.floor(Math.random() * 100000)}@travelai.app`;
}

async function main() {
  const email = randomEmail();
  const password = 'SmokeTest1!';

  await request('/health', { method: 'GET' });

  await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Smoke User', email, password }),
  });

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const accessToken = login.accessToken;
  const authHeaders = { Authorization: `Bearer ${accessToken}` };

  const trip = {
    id: `smoke-trip-${Date.now()}`,
    from: 'Москва',
    to: 'Казань',
    status: 'draft',
    startDate: '2026-06-01',
    endDate: '2026-06-03',
    budget: 20000,
  };

  await request('/trips/upsert', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ trip }),
  });

  const trips = await request('/trips', {
    method: 'GET',
    headers: authHeaders,
  });

  if (!Array.isArray(trips.trips) || !trips.trips.some((t) => t.id === trip.id)) {
    throw new Error('Trip upsert/read verification failed');
  }

  await request('/trips/delete', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ id: trip.id }),
  });

  const demoLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'demo@travelai.app', password: 'Travel123!' }),
  });

  const demoHeaders = { Authorization: `Bearer ${demoLogin.accessToken}` };
  const reseed = await request('/trips/reseed-demo', {
    method: 'POST',
    headers: demoHeaders,
  });

  if (!reseed.ok || typeof reseed.count !== 'number' || reseed.count < 5) {
    throw new Error('Demo reseed verification failed');
  }

  const demoTrips = await request('/trips', {
    method: 'GET',
    headers: demoHeaders,
  });

  if (!Array.isArray(demoTrips.trips) || demoTrips.trips.length < 5) {
    throw new Error('Demo trips list after reseed is invalid');
  }

  const vladTripRow = demoTrips.trips.find((row) => {
    try {
      const payload = JSON.parse(row.payload);
      return payload?.to === 'Владивосток';
    } catch {
      return false;
    }
  });

  if (!vladTripRow) {
    throw new Error('Reseeded demo data does not contain Vladivostok trip');
  }

  const vladTrip = JSON.parse(vladTripRow.payload);
  const placeNames = (vladTrip.days || []).flatMap((d) => (d.places || []).map((p) => String(p.name)));
  if (placeNames.some((name) => name.includes('Эрмитаж'))) {
    throw new Error('Vladivostok trip contains Hermitage after reseed');
  }

  console.log('API smoke test passed');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
