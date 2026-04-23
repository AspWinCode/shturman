const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'app-db.json');

function ensureJsonDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    const initial = { users: [], refreshTokens: [], trips: [], auditLogs: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
  }
}

function readJsonDb() {
  ensureJsonDb();
  const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const normalized = {
    users: Array.isArray(parsed.users) ? parsed.users : [],
    refreshTokens: Array.isArray(parsed.refreshTokens) ? parsed.refreshTokens : [],
    trips: Array.isArray(parsed.trips) ? parsed.trips : [],
    auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : [],
  };
  if (!Array.isArray(parsed.auditLogs)) {
    writeJsonDb(normalized);
  }
  return normalized;
}

function writeJsonDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

class Storage {
  constructor() {
    this.mode = process.env.DATABASE_URL ? 'postgres' : 'json';
    this.pool = null;
    if (this.mode === 'postgres') {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
      });
    }
  }

  async init() {
    if (this.mode === 'postgres') {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS refresh_tokens (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          exp BIGINT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS trips (
          id TEXT NOT NULL,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          payload TEXT NOT NULL,
          status TEXT NOT NULL,
          start_date TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL,
          PRIMARY KEY (id, user_id)
        );

        CREATE TABLE IF NOT EXISTS audit_logs (
          id BIGSERIAL PRIMARY KEY,
          ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          path TEXT NOT NULL,
          method TEXT NOT NULL,
          status INTEGER NOT NULL,
          ip TEXT NOT NULL,
          user_id TEXT,
          email TEXT,
          event TEXT,
          meta JSONB
        );

        CREATE INDEX IF NOT EXISTS idx_refresh_tokens_exp ON refresh_tokens(exp);
        CREATE INDEX IF NOT EXISTS idx_trips_user_start ON trips(user_id, start_date);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_ts ON audit_logs(ts);
      `);
      return;
    }

    ensureJsonDb();
  }

  async health() {
    if (this.mode === 'postgres') {
      await this.pool.query('SELECT 1');
      return { ok: true, mode: 'postgres' };
    }
    ensureJsonDb();
    return { ok: true, mode: 'json' };
  }

  async cleanupRefreshTokens(nowSec) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM refresh_tokens WHERE exp < $1', [nowSec]);
      return;
    }
    const db = readJsonDb();
    db.refreshTokens = db.refreshTokens.filter((token) => token.exp > nowSec);
    writeJsonDb(db);
  }

  async findUserByEmail(email) {
    if (this.mode === 'postgres') {
      const { rows } = await this.pool.query(
        `SELECT id, name, email, password_hash, password_salt, created_at, updated_at
         FROM users WHERE email = $1 LIMIT 1`,
        [email]
      );
      if (!rows[0]) return null;
      return {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
        passwordHash: rows[0].password_hash,
        passwordSalt: rows[0].password_salt,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };
    }

    const db = readJsonDb();
    return db.users.find((user) => user.email === email) || null;
  }

  async findUserById(id) {
    if (this.mode === 'postgres') {
      const { rows } = await this.pool.query(
        `SELECT id, name, email, password_hash, password_salt, created_at, updated_at
         FROM users WHERE id = $1 LIMIT 1`,
        [id]
      );
      if (!rows[0]) return null;
      return {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
        passwordHash: rows[0].password_hash,
        passwordSalt: rows[0].password_salt,
        createdAt: rows[0].created_at,
        updatedAt: rows[0].updated_at,
      };
    }

    const db = readJsonDb();
    return db.users.find((user) => user.id === id) || null;
  }

  async createUser(user) {
    if (this.mode === 'postgres') {
      await this.pool.query(
        `INSERT INTO users (id, name, email, password_hash, password_salt, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [user.id, user.name, user.email, user.passwordHash || '', user.passwordSalt || '', user.createdAt, user.updatedAt]
      );
      return;
    }

    const db = readJsonDb();
    db.users.push(user);
    writeJsonDb(db);
  }

  async deleteUser(userId) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM users WHERE id = $1', [userId]);
      return;
    }

    const db = readJsonDb();
    db.users = db.users.filter((u) => u.id !== userId);
    writeJsonDb(db);
  }

  async updateUser(user) {
    if (this.mode === 'postgres') {
      await this.pool.query(
        `UPDATE users SET
          name = $2,
          email = $3,
          password_hash = $4,
          password_salt = $5,
          updated_at = $6
         WHERE id = $1`,
        [user.id, user.name, user.email, user.passwordHash, user.passwordSalt, user.updatedAt]
      );
      return;
    }

    const db = readJsonDb();
    const idx = db.users.findIndex((item) => item.id === user.id);
    if (idx >= 0) db.users[idx] = user;
    writeJsonDb(db);
  }

  async addRefreshToken(userId, tokenHash, exp) {
    if (this.mode === 'postgres') {
      await this.pool.query(
        `INSERT INTO refresh_tokens (token_hash, user_id, exp) VALUES ($1, $2, $3)
         ON CONFLICT (token_hash) DO UPDATE SET user_id = EXCLUDED.user_id, exp = EXCLUDED.exp`,
        [tokenHash, userId, exp]
      );
      return;
    }

    const db = readJsonDb();
    const idx = db.refreshTokens.findIndex((item) => item.tokenHash === tokenHash);
    const payload = { tokenHash, userId, exp };
    if (idx >= 0) db.refreshTokens[idx] = payload;
    else db.refreshTokens.push(payload);
    writeJsonDb(db);
  }

  async hasRefreshToken(userId, tokenHash) {
    if (this.mode === 'postgres') {
      const { rows } = await this.pool.query(
        `SELECT token_hash FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2 LIMIT 1`,
        [userId, tokenHash]
      );
      return Boolean(rows[0]);
    }

    const db = readJsonDb();
    return db.refreshTokens.some((item) => item.userId === userId && item.tokenHash === tokenHash);
  }

  async deleteRefreshToken(tokenHash) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM refresh_tokens WHERE token_hash = $1', [tokenHash]);
      return;
    }

    const db = readJsonDb();
    db.refreshTokens = db.refreshTokens.filter((item) => item.tokenHash !== tokenHash);
    writeJsonDb(db);
  }

  async revokeUserRefreshTokens(userId) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
      return;
    }

    const db = readJsonDb();
    db.refreshTokens = db.refreshTokens.filter((item) => item.userId !== userId);
    writeJsonDb(db);
  }

  async listTrips(userId) {
    if (this.mode === 'postgres') {
      const { rows } = await this.pool.query(
        `SELECT id, payload, status, start_date
         FROM trips WHERE user_id = $1 ORDER BY start_date ASC`,
        [userId]
      );
      return rows;
    }

    const db = readJsonDb();
    return db.trips
      .filter((trip) => trip.userId === userId)
      .sort((a, b) => String(a.start_date).localeCompare(String(b.start_date)));
  }

  async upsertTrip(userId, tripRow) {
    if (this.mode === 'postgres') {
      await this.pool.query(
        `INSERT INTO trips (id, user_id, payload, status, start_date, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id, user_id) DO UPDATE SET
           payload = EXCLUDED.payload,
           status = EXCLUDED.status,
           start_date = EXCLUDED.start_date,
           updated_at = EXCLUDED.updated_at`,
        [tripRow.id, userId, tripRow.payload, tripRow.status, tripRow.start_date, tripRow.updated_at]
      );
      return;
    }

    const db = readJsonDb();
    const idx = db.trips.findIndex((trip) => trip.userId === userId && trip.id === tripRow.id);
    const payload = { ...tripRow, userId };
    if (idx >= 0) db.trips[idx] = payload;
    else db.trips.push(payload);
    writeJsonDb(db);
  }

  async deleteTrip(userId, id) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM trips WHERE user_id = $1 AND id = $2', [userId, id]);
      return;
    }

    const db = readJsonDb();
    db.trips = db.trips.filter((trip) => !(trip.userId === userId && trip.id === id));
    writeJsonDb(db);
  }

  async resetTrips(userId) {
    if (this.mode === 'postgres') {
      await this.pool.query('DELETE FROM trips WHERE user_id = $1', [userId]);
      return;
    }

    const db = readJsonDb();
    db.trips = db.trips.filter((trip) => trip.userId !== userId);
    writeJsonDb(db);
  }

  async replaceTrips(userId, tripsRows) {
    if (this.mode === 'postgres') {
      const client = await this.pool.connect();
      try {
        await client.query('BEGIN');
        await client.query('DELETE FROM trips WHERE user_id = $1', [userId]);
        for (const tripRow of tripsRows) {
          await client.query(
            `INSERT INTO trips (id, user_id, payload, status, start_date, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [tripRow.id, userId, tripRow.payload, tripRow.status, tripRow.start_date, tripRow.updated_at]
          );
        }
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
      return;
    }

    const db = readJsonDb();
    const keep = db.trips.filter((trip) => trip.userId !== userId);
    const next = tripsRows.map((tripRow) => ({ ...tripRow, userId }));
    db.trips = [...keep, ...next];
    writeJsonDb(db);
  }

  async appendAudit(entry) {
    if (this.mode === 'postgres') {
      await this.pool.query(
        `INSERT INTO audit_logs (path, method, status, ip, user_id, email, event, meta)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)`,
        [
          entry.path,
          entry.method,
          entry.status,
          entry.ip,
          entry.userId || null,
          entry.email || null,
          entry.event || null,
          JSON.stringify(entry.meta || {}),
        ]
      );
      return;
    }

    const db = readJsonDb();
    db.auditLogs.push({
      ts: new Date().toISOString(),
      ...entry,
    });
    if (db.auditLogs.length > 5000) {
      db.auditLogs = db.auditLogs.slice(db.auditLogs.length - 5000);
    }
    writeJsonDb(db);
  }
}

module.exports = { Storage };
