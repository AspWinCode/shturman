const crypto = require('crypto');
const http = require('http');
const { Storage } = require('./storage');
const { buildDemoTrips } = require('./demoSeed');

const PORT = Number(process.env.AUTH_API_PORT || 8787);
const HOST = process.env.AUTH_API_HOST || '0.0.0.0';
const ACCESS_TOKEN_TTL_SEC = 15 * 60;
const REFRESH_TOKEN_TTL_SEC = 30 * 24 * 60 * 60;
const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'travel-ai-local-dev-secret-change-me';
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';
const ENABLE_DEMO_USER = process.env.AUTH_ENABLE_DEMO_USER === 'true' || !IS_PROD;
const ENABLE_TRIPS_RESET = process.env.AUTH_ENABLE_TRIPS_RESET === 'true' || !IS_PROD;
const ENABLE_TRIPS_RESEED = process.env.AUTH_ENABLE_TRIPS_RESEED === 'true' || !IS_PROD;

const storage = new Storage();

const rateBuckets = new Map();
const failedLoginBuckets = new Map();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TRIP_STATUS = new Set(['upcoming', 'past', 'draft']);

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isValidEmail(email) {
  return EMAIL_RE.test(email);
}

function isStrongPassword(password) {
  const value = String(password || '');
  if (value.length < 8) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[a-z]/.test(value)) return false;
  if (!/[0-9]/.test(value)) return false;
  if (!/[^A-Za-z0-9]/.test(value)) return false;
  return true;
}

function requireStrongSecret() {
  if (!IS_PROD) return;
  if (!JWT_SECRET || JWT_SECRET === 'travel-ai-local-dev-secret-change-me' || JWT_SECRET.length < 32) {
    throw new Error('AUTH_JWT_SECRET must be set to a strong value in production');
  }
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function validateTripPayload(trip) {
  if (!isObject(trip)) return 'trip must be an object';
  if (!trip.id || typeof trip.id !== 'string') return 'trip.id is required';
  if (!trip.startDate || typeof trip.startDate !== 'string') return 'trip.startDate is required';
  if (!trip.status || typeof trip.status !== 'string' || !ALLOWED_TRIP_STATUS.has(trip.status)) {
    return 'trip.status must be one of: upcoming, past, draft';
  }
  if (!trip.to || typeof trip.to !== 'string') return 'trip.to is required';
  if (!trip.from || typeof trip.from !== 'string') return 'trip.from is required';
  if (typeof trip.budget !== 'number' || Number.isNaN(trip.budget) || trip.budget < 0) {
    return 'trip.budget must be a non-negative number';
  }
  return null;
}

function getLoginBucketKey(email, ip) {
  return `${ip}:${email}`;
}

function getLoginBucket(key) {
  return failedLoginBuckets.get(key) || { count: 0, blockedUntilMs: 0 };
}

function registerLoginFailure(email, ip) {
  const key = getLoginBucketKey(email, ip);
  const bucket = getLoginBucket(key);
  const now = Date.now();
  const resetThresholdMs = 10 * 60 * 1000;

  if (bucket.blockedUntilMs > 0 && now > bucket.blockedUntilMs) {
    bucket.count = 0;
    bucket.blockedUntilMs = 0;
  }

  if (bucket.lastAttemptMs && now - bucket.lastAttemptMs > resetThresholdMs) {
    bucket.count = 0;
  }

  bucket.count += 1;
  bucket.lastAttemptMs = now;

  if (bucket.count >= 6) {
    bucket.blockedUntilMs = now + 10 * 60 * 1000;
  }

  failedLoginBuckets.set(key, bucket);
  return bucket;
}

function resetLoginFailures(email, ip) {
  failedLoginBuckets.delete(getLoginBucketKey(email, ip));
}

function getLoginBlockRemainingSec(email, ip) {
  const key = getLoginBucketKey(email, ip);
  const bucket = getLoginBucket(key);
  if (!bucket.blockedUntilMs) return 0;
  const remainingMs = bucket.blockedUntilMs - Date.now();
  return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
}

function signJwt(payload, ttlSec) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, iat: nowSec(), exp: nowSec() + ttlSec };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedBody = base64url(JSON.stringify(body));
  const unsigned = `${encodedHeader}.${encodedBody}`;
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(unsigned).digest('base64url');
  return `${unsigned}.${signature}`;
}

function verifyJwt(token) {
  try {
    const [header, payload, signature] = String(token).split('.');
    if (!header || !payload || !signature) return null;
    const unsigned = `${header}.${payload}`;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(unsigned).digest('base64url');
    if (signature !== expected) return null;
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded.exp || decoded.exp < nowSec()) return null;
    return decoded;
  } catch {
    return null;
  }
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, hash, salt) {
  const next = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(next, 'hex'), Buffer.from(hash, 'hex'));
}

function createUser(name, email, password) {
  const { salt, hash } = hashPassword(password);
  return {
    id: crypto.randomUUID(),
    name: String(name || '').trim() || 'User',
    email: normalizeEmail(email),
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function sanitizeUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

function buildTripRows(trips) {
  return trips.map((trip) => ({
    id: String(trip.id),
    payload: JSON.stringify(trip),
    status: String(trip.status),
    start_date: String(trip.startDate),
    updated_at: new Date().toISOString(),
  }));
}

function issueTokens(user) {
  const accessToken = signJwt(
    { sub: user.id, email: user.email, type: 'access', jti: crypto.randomUUID() },
    ACCESS_TOKEN_TTL_SEC
  );
  const refreshToken = signJwt(
    { sub: user.id, email: user.email, type: 'refresh', jti: crypto.randomUUID() },
    REFRESH_TOKEN_TTL_SEC
  );
  return { accessToken, refreshToken };
}

function json(res, status, data, extraHeaders) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    ...(extraHeaders || {}),
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString('utf8');
      if (raw.length > 2 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function parseUrl(req) {
  return new URL(req.url, `http://${req.headers.host || 'localhost'}`);
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function rateRuleForPath(pathname) {
  const strictPaths = new Set([
    '/auth/login',
    '/auth/register',
    '/auth/recover',
    '/auth/change-password',
    '/auth/refresh',
  ]);

  if (strictPaths.has(pathname)) {
    return { limit: 20, windowMs: 60 * 1000 };
  }

  return { limit: 240, windowMs: 60 * 1000 };
}

function enforceRateLimit(ip, pathname) {
  const rule = rateRuleForPath(pathname);
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const bucket = rateBuckets.get(key) || [];
  const alive = bucket.filter((ts) => now - ts < rule.windowMs);
  if (alive.length >= rule.limit) {
    const retryAfterSec = Math.max(1, Math.ceil((rule.windowMs - (now - alive[0])) / 1000));
    return { allowed: false, retryAfterSec };
  }

  alive.push(now);
  rateBuckets.set(key, alive);
  return { allowed: true, retryAfterSec: 0 };
}

async function requireAccessUser(req) {
  const auth = String(req.headers.authorization || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const payload = verifyJwt(token);
  if (!payload || payload.type !== 'access') return { error: 'UNAUTHORIZED' };
  const user = await storage.findUserById(payload.sub);
  if (!user) return { error: 'USER_NOT_FOUND' };
  return { user, payload };
}

async function audit(req, status, context) {
  const pathname = parseUrl(req).pathname;
  if (!pathname.startsWith('/auth') && !pathname.startsWith('/trips')) return;

  const ip = getClientIp(req);
  await storage.appendAudit({
    path: pathname,
    method: req.method,
    status,
    ip,
    userId: context?.userId || null,
    email: context?.email || null,
    event: context?.event || null,
    meta: context?.meta || {},
  });
}

async function respond(req, res, status, data, context, extraHeaders) {
  await audit(req, status, context);
  return json(res, status, data, extraHeaders);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  const url = parseUrl(req);
  const ip = getClientIp(req);

  const rate = enforceRateLimit(ip, url.pathname);
  if (!rate.allowed) {
    return respond(
      req,
      res,
      429,
      { ok: false, message: 'Too many requests. Try again later.' },
      { event: 'rate_limit', meta: { retryAfterSec: rate.retryAfterSec } },
      { 'Retry-After': String(rate.retryAfterSec) }
    );
  }

  if (url.pathname === '/health' && req.method === 'GET') {
    try {
      const health = await storage.health();
      return json(res, 200, { ok: true, service: 'travel-app-api', storage: health.mode });
    } catch {
      return json(res, 500, { ok: false, message: 'Storage healthcheck failed' });
    }
  }

  try {
    await storage.cleanupRefreshTokens(nowSec());

    if (url.pathname === '/auth/register' && req.method === 'POST') {
      const body = await parseBody(req);
      const name = String(body.name || '').trim();
      const email = normalizeEmail(body.email);
      const password = String(body.password || '');
      if (!name || !email || !password) {
        return respond(req, res, 400, { ok: false, message: 'name, email and password are required' }, { event: 'register_invalid' });
      }
      if (!isValidEmail(email)) {
        return respond(req, res, 400, { ok: false, message: 'Invalid email format' }, { event: 'register_invalid_email', email });
      }
      if (!isStrongPassword(password)) {
        return respond(req, res, 400, { ok: false, message: 'Password does not meet security policy' }, { event: 'register_weak_password', email });
      }
      if (name.length < 2 || name.length > 80) {
        return respond(req, res, 400, { ok: false, message: 'name must be 2-80 characters' }, { event: 'register_invalid_name', email });
      }

      const exists = await storage.findUserByEmail(email);
      if (exists) {
        return respond(req, res, 409, { ok: false, message: 'User already exists' }, { event: 'register_conflict', email });
      }

      const user = createUser(name, email, password);
      await storage.createUser(user);
      return respond(req, res, 201, { ok: true, user: sanitizeUser(user) }, { event: 'register_success', userId: user.id, email: user.email });
    }

    if (url.pathname === '/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = normalizeEmail(body.email);
      const password = String(body.password || '');
      if (!email || !password) {
        return respond(req, res, 400, { ok: false, message: 'email and password are required' }, { event: 'login_invalid', email });
      }
      if (!isValidEmail(email)) {
        return respond(req, res, 400, { ok: false, message: 'Invalid email format' }, { event: 'login_invalid_email', email });
      }

      const remainingSec = getLoginBlockRemainingSec(email, ip);
      if (remainingSec > 0) {
        return respond(
          req,
          res,
          429,
          { ok: false, message: `Too many failed login attempts. Retry in ${remainingSec}s.` },
          { event: 'login_blocked', email, meta: { remainingSec } },
          { 'Retry-After': String(remainingSec) }
        );
      }

      const user = await storage.findUserByEmail(email);
      if (!user || !verifyPassword(password, user.passwordHash, user.passwordSalt)) {
        registerLoginFailure(email, ip);
        return respond(req, res, 401, { ok: false, message: 'Invalid credentials' }, { event: 'login_failed', email });
      }
      resetLoginFailures(email, ip);

      const { accessToken, refreshToken } = issueTokens(user);
      const refreshPayload = verifyJwt(refreshToken);
      await storage.addRefreshToken(user.id, hashToken(refreshToken), refreshPayload.exp);
      return respond(
        req,
        res,
        200,
        { ok: true, user: sanitizeUser(user), accessToken, refreshToken },
        { event: 'login_success', userId: user.id, email: user.email }
      );
    }

    if (url.pathname === '/auth/refresh' && req.method === 'POST') {
      const body = await parseBody(req);
      const currentRefreshToken = String(body.refreshToken || '');
      if (!currentRefreshToken) {
        return respond(req, res, 400, { ok: false, message: 'refreshToken is required' }, { event: 'refresh_missing_token' });
      }
      const refreshPayload = verifyJwt(currentRefreshToken);
      if (!refreshPayload || refreshPayload.type !== 'refresh') {
        return respond(req, res, 401, { ok: false, message: 'Invalid refresh token' }, { event: 'refresh_invalid' });
      }

      const tokenHash = hashToken(currentRefreshToken);
      const exists = await storage.hasRefreshToken(refreshPayload.sub, tokenHash);
      const user = await storage.findUserById(refreshPayload.sub);
      if (!exists || !user) {
        return respond(req, res, 401, { ok: false, message: 'Session not found' }, { event: 'refresh_missing', userId: refreshPayload.sub });
      }

      await storage.deleteRefreshToken(tokenHash);
      const { accessToken, refreshToken } = issueTokens(user);
      const nextPayload = verifyJwt(refreshToken);
      await storage.addRefreshToken(user.id, hashToken(refreshToken), nextPayload.exp);

      return respond(
        req,
        res,
        200,
        { ok: true, accessToken, refreshToken },
        { event: 'refresh_success', userId: user.id, email: user.email }
      );
    }

    if (url.pathname === '/auth/logout' && req.method === 'POST') {
      const body = await parseBody(req);
      const refreshToken = String(body.refreshToken || '');
      if (refreshToken) {
        await storage.deleteRefreshToken(hashToken(refreshToken));
      }
      return respond(req, res, 200, { ok: true }, { event: 'logout_success' });
    }

    if (url.pathname === '/auth/recover' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = normalizeEmail(body.email);
      const newPassword = String(body.newPassword || '');
      if (!email || !newPassword) {
        return respond(req, res, 400, { ok: false, message: 'email and newPassword are required' }, { event: 'recover_invalid' });
      }
      if (!isValidEmail(email)) {
        return respond(req, res, 400, { ok: false, message: 'Invalid email format' }, { event: 'recover_invalid_email', email });
      }
      if (!isStrongPassword(newPassword)) {
        return respond(req, res, 400, { ok: false, message: 'Password does not meet security policy' }, { event: 'recover_weak_password', email });
      }

      const user = await storage.findUserByEmail(email);
      if (!user) {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'recover_not_found', email });
      }

      const next = hashPassword(newPassword);
      const updated = {
        ...user,
        passwordHash: next.hash,
        passwordSalt: next.salt,
        updatedAt: new Date().toISOString(),
      };
      await storage.updateUser(updated);
      await storage.revokeUserRefreshTokens(updated.id);
      return respond(req, res, 200, { ok: true }, { event: 'recover_success', userId: updated.id, email: updated.email });
    }

    if (url.pathname === '/auth/change-password' && req.method === 'POST') {
      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'change_password_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'change_password_missing_user' });
      }

      const body = await parseBody(req);
      const currentPassword = String(body.currentPassword || '');
      const newPassword = String(body.newPassword || '');
      if (!currentPassword || !newPassword) {
        return respond(req, res, 400, { ok: false, message: 'currentPassword and newPassword are required' }, { event: 'change_password_invalid', userId: auth.user.id, email: auth.user.email });
      }
      if (!isStrongPassword(newPassword)) {
        return respond(req, res, 400, { ok: false, message: 'Password does not meet security policy' }, { event: 'change_password_weak_password', userId: auth.user.id, email: auth.user.email });
      }

      if (!verifyPassword(currentPassword, auth.user.passwordHash, auth.user.passwordSalt)) {
        return respond(req, res, 401, { ok: false, message: 'Current password is incorrect' }, { event: 'change_password_wrong_current', userId: auth.user.id, email: auth.user.email });
      }

      const next = hashPassword(newPassword);
      const updated = {
        ...auth.user,
        passwordHash: next.hash,
        passwordSalt: next.salt,
        updatedAt: new Date().toISOString(),
      };
      await storage.updateUser(updated);
      await storage.revokeUserRefreshTokens(updated.id);
      return respond(req, res, 200, { ok: true }, { event: 'change_password_success', userId: updated.id, email: updated.email });
    }

    if (url.pathname === '/trips' && req.method === 'GET') {
      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'trips_list_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'trips_list_missing_user' });
      }

      const trips = await storage.listTrips(auth.user.id);
      return respond(req, res, 200, { ok: true, trips }, { event: 'trips_list_success', userId: auth.user.id, email: auth.user.email, meta: { count: trips.length } });
    }

    if (url.pathname === '/trips/upsert' && req.method === 'POST') {
      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'trips_upsert_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'trips_upsert_missing_user' });
      }

      const body = await parseBody(req);
      const trip = body.trip;
      const tripValidationError = validateTripPayload(trip);
      if (tripValidationError) {
        return respond(req, res, 400, { ok: false, message: tripValidationError }, { event: 'trips_upsert_invalid', userId: auth.user.id, email: auth.user.email });
      }

      await storage.upsertTrip(auth.user.id, {
        id: String(trip.id),
        payload: JSON.stringify(trip),
        status: String(trip.status),
        start_date: String(trip.startDate),
        updated_at: new Date().toISOString(),
      });

      return respond(req, res, 200, { ok: true }, { event: 'trips_upsert_success', userId: auth.user.id, email: auth.user.email, meta: { tripId: trip.id } });
    }

    if (url.pathname === '/trips/delete' && req.method === 'POST') {
      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'trips_delete_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'trips_delete_missing_user' });
      }

      const body = await parseBody(req);
      const id = String(body.id || '');
      if (!id) {
        return respond(req, res, 400, { ok: false, message: 'id is required' }, { event: 'trips_delete_invalid', userId: auth.user.id, email: auth.user.email });
      }

      await storage.deleteTrip(auth.user.id, id);
      return respond(req, res, 200, { ok: true }, { event: 'trips_delete_success', userId: auth.user.id, email: auth.user.email, meta: { tripId: id } });
    }

    if (url.pathname === '/trips/reset' && req.method === 'POST') {
      if (!ENABLE_TRIPS_RESET) {
        return respond(req, res, 403, { ok: false, message: 'Trips reset is disabled in this environment' }, { event: 'trips_reset_disabled' });
      }
      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'trips_reset_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'trips_reset_missing_user' });
      }

      await storage.resetTrips(auth.user.id);
      return respond(req, res, 200, { ok: true }, { event: 'trips_reset_success', userId: auth.user.id, email: auth.user.email });
    }

    if (url.pathname === '/trips/reseed-demo' && req.method === 'POST') {
      if (!ENABLE_TRIPS_RESEED) {
        return respond(req, res, 403, { ok: false, message: 'Trips reseed is disabled in this environment' }, { event: 'trips_reseed_disabled' });
      }

      const auth = await requireAccessUser(req);
      if (auth.error === 'UNAUTHORIZED') {
        return respond(req, res, 401, { ok: false, message: 'Unauthorized' }, { event: 'trips_reseed_unauthorized' });
      }
      if (auth.error === 'USER_NOT_FOUND') {
        return respond(req, res, 404, { ok: false, message: 'User not found' }, { event: 'trips_reseed_missing_user' });
      }

      const demoEmail = 'demo@travelai.app';
      if (normalizeEmail(auth.user.email) !== demoEmail) {
        return respond(req, res, 403, { ok: false, message: 'Demo reseed is allowed only for demo account' }, { event: 'trips_reseed_forbidden', userId: auth.user.id, email: auth.user.email });
      }

      const demoTrips = buildDemoTrips();
      await storage.replaceTrips(auth.user.id, buildTripRows(demoTrips));
      return respond(req, res, 200, { ok: true, count: demoTrips.length }, { event: 'trips_reseed_success', userId: auth.user.id, email: auth.user.email, meta: { count: demoTrips.length } });
    }

    return respond(req, res, 404, { ok: false, message: 'Route not found' }, { event: 'route_not_found' });
  } catch (error) {
    return respond(req, res, 500, { ok: false, message: error.message || 'Internal error' }, { event: 'internal_error', meta: { message: error.message } });
  }
});

async function bootstrap() {
  requireStrongSecret();
  await storage.init();

  if (ENABLE_DEMO_USER) {
    const demoEmail = 'demo@travelai.app';
    const existing = await storage.findUserByEmail(demoEmail);
    if (!existing) {
      const demoUser = createUser('Demo', demoEmail, 'Travel123!');
      await storage.createUser(demoUser);
    }
  }

  server.listen(PORT, HOST, () => {
    console.log(`Travel API listening on http://${HOST}:${PORT}`);
    console.log(`Storage mode: ${storage.mode}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API:', error);
  process.exit(1);
});

