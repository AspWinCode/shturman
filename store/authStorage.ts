import AsyncStorage from '@react-native-async-storage/async-storage';
import { validatePasswordByPolicy } from '@/constants/passwordPolicy';
import {
  apiChangePassword,
  apiDeleteAccount,
  apiLogin,
  apiLogout,
  apiOAuthLogin,
  apiRecover,
  apiRefresh,
  apiRegister,
  healthcheckAuthApi,
} from '@/store/authApi';

const USERS_KEY = 'auth.users.v1'; // Local fallback only
const SESSION_KEY = 'auth.session.v2';

export interface StoredAuthUser {
  email: string;
  name: string;
  password?: string;
  createdAt: string;
}

interface StoredAuthSession {
  user: {
    email: string;
    name: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

const DEMO_USER: StoredAuthUser = {
  email: 'demo@shturman.app',
  name: 'Demo',
  password: 'Travel123!',
  createdAt: '2026-01-01T00:00:00.000Z',
};

let cachedApiAvailable: boolean | null = null;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toPublicUser(user: { email: string; name: string }): StoredAuthUser {
  return {
    email: normalizeEmail(user.email),
    name: user.name.trim(),
    createdAt: new Date().toISOString(),
  };
}

async function isApiAvailable() {
  if (cachedApiAvailable !== null) return cachedApiAvailable;
  const health = await healthcheckAuthApi();
  cachedApiAvailable = health.ok;
  return cachedApiAvailable;
}

function invalidateApiAvailability() {
  cachedApiAvailable = null;
}

async function readUsers(): Promise<StoredAuthUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }

  try {
    const parsed = JSON.parse(raw) as StoredAuthUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    }
    return parsed;
  } catch {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }
}

async function writeUsers(users: StoredAuthUser[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function readSession(): Promise<StoredAuthSession | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredAuthSession;
    if (!parsed?.user?.email || !parsed?.user?.name) return null;
    return parsed;
  } catch {
    // backward compatibility with v1 where session stored as plain email
    const email = normalizeEmail(raw);
    if (!email.includes('@')) return null;
    const users = await readUsers();
    const user = users.find((u) => normalizeEmail(u.email) === email);
    if (!user) return null;
    return { user: { email: user.email, name: user.name } };
  }
}

async function writeSession(session: StoredAuthSession) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function hydrateAuthStorage(): Promise<{
  users: StoredAuthUser[];
  sessionUser: StoredAuthUser | null;
}> {
  const users = await readUsers();
  const session = await readSession();
  if (!session) return { users, sessionUser: null };

  // If we have a refresh token, try to rotate access token.
  if (session.refreshToken && await isApiAvailable()) {
    const refreshed = await apiRefresh(session.refreshToken);
    if (refreshed.ok) {
      await writeSession({
        ...session,
        accessToken: refreshed.data.accessToken,
        refreshToken: refreshed.data.refreshToken,
      });
    } else {
      await clearSession();
      return { users, sessionUser: null };
    }
  }

  return {
    users,
    sessionUser: toPublicUser(session.user),
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: StoredAuthUser } | { ok: false; message: string }> {
  const passwordCheck = validatePasswordByPolicy(password);
  if (!passwordCheck.ok) {
    return { ok: false, message: passwordCheck.message || 'Слабый пароль' };
  }

  const normalized = normalizeEmail(email);
  if (await isApiAvailable()) {
    const result = await apiRegister(name.trim(), normalized, password);
    if (result.ok) {
      return { ok: true, user: toPublicUser(result.data.user) };
    }
    return { ok: false, message: result.message };
  }

  const users = await readUsers();
  const exists = users.some((u) => normalizeEmail(u.email) === normalized);
  if (exists) return { ok: false, message: 'Пользователь с таким email уже существует' };

  const newUser: StoredAuthUser = {
    email: normalized,
    name: name.trim(),
    password,
    createdAt: new Date().toISOString(),
  };
  await writeUsers([...users, newUser]);
  return { ok: true, user: toPublicUser(newUser) };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ ok: true; user: StoredAuthUser } | { ok: false; message: string }> {
  const normalized = normalizeEmail(email);

  if (await isApiAvailable()) {
    const result = await apiLogin(normalized, password);
    if (result.ok) {
      await writeSession({
        user: { email: result.data.user.email, name: result.data.user.name },
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
      return { ok: true, user: toPublicUser(result.data.user) };
    }
    return { ok: false, message: result.message };
  }

  const users = await readUsers();
  const user = users.find((u) => normalizeEmail(u.email) === normalized);
  if (!user || user.password !== password) {
    return { ok: false, message: 'Неверный логин или пароль' };
  }

  await writeSession({
    user: { email: user.email, name: user.name },
  });
  return { ok: true, user: toPublicUser(user) };
}

export async function changePasswordForUser(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const passwordCheck = validatePasswordByPolicy(newPassword);
  if (!passwordCheck.ok) {
    return { ok: false, message: passwordCheck.message || 'Слабый пароль' };
  }

  const session = await readSession();
  if (session?.accessToken && await isApiAvailable()) {
    const result = await apiChangePassword(session.accessToken, currentPassword, newPassword);
    if (result.ok) return { ok: true };
    return { ok: false, message: result.message };
  }

  const users = await readUsers();
  const normalized = normalizeEmail(email);
  const idx = users.findIndex((u) => normalizeEmail(u.email) === normalized);
  if (idx === -1) return { ok: false, message: 'Пользователь не найден' };
  if (users[idx].password !== currentPassword) {
    return { ok: false, message: 'Текущий пароль введен неверно' };
  }
  users[idx] = { ...users[idx], password: newPassword };
  await writeUsers(users);
  return { ok: true };
}

export async function resetPasswordByEmail(
  email: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const passwordCheck = validatePasswordByPolicy(newPassword);
  if (!passwordCheck.ok) {
    return { ok: false, message: passwordCheck.message || 'Слабый пароль' };
  }

  const normalized = normalizeEmail(email);
  if (await isApiAvailable()) {
    const result = await apiRecover(normalized, newPassword);
    if (result.ok) return { ok: true };
    return { ok: false, message: result.message };
  }

  const users = await readUsers();
  const idx = users.findIndex((u) => normalizeEmail(u.email) === normalized);
  if (idx === -1) return { ok: false, message: 'Пользователь с таким email не найден' };
  users[idx] = { ...users[idx], password: newPassword };
  await writeUsers(users);
  return { ok: true };
}

export async function oauthLoginUser(
  provider: 'yandex' | 'google' | 'apple',
  idToken: string,
  oauthUser: { email: string; name: string }
): Promise<{ ok: true; user: StoredAuthUser } | { ok: false; message: string }> {
  if (!await isApiAvailable()) {
    // Offline fallback: store a fake session without real tokens
    const user: StoredAuthUser = {
      email: normalizeEmail(oauthUser.email),
      name: oauthUser.name.trim() || 'Пользователь',
      createdAt: new Date().toISOString(),
    };
    await writeSession({ user: { email: user.email, name: user.name } });
    return { ok: true, user };
  }

  const result = await apiOAuthLogin(provider, idToken, oauthUser);
  if (!result.ok) return { ok: false, message: result.message };

  await writeSession({
    user: { email: result.data.user.email, name: result.data.user.name },
    accessToken: result.data.accessToken,
    refreshToken: result.data.refreshToken,
  });
  return { ok: true, user: toPublicUser(result.data.user) };
}

export async function deleteAccountForUser(): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await readSession();

  if (session?.accessToken && await isApiAvailable()) {
    const result = await apiDeleteAccount(session.accessToken);
    if (!result.ok) return { ok: false, message: result.message };
  }

  // Clear local session and users cache regardless
  await clearSession();
  await AsyncStorage.removeItem(USERS_KEY);
  invalidateApiAvailability();
  return { ok: true };
}

export async function logoutUser() {
  const session = await readSession();
  if (session?.refreshToken && await isApiAvailable()) {
    await apiLogout(session.refreshToken);
  }
  await clearSession();
}

export async function resetAuthStorage() {
  await AsyncStorage.multiRemove([USERS_KEY, SESSION_KEY]);
  invalidateApiAvailability();
}

export async function ensureAccessToken(): Promise<string | null> {
  const session = await readSession();
  if (!session) return null;

  if (session.accessToken) return session.accessToken;
  if (!session.refreshToken) return null;
  if (!await isApiAvailable()) return null;

  const refreshed = await apiRefresh(session.refreshToken);
  if (!refreshed.ok) {
    await clearSession();
    return null;
  }

  await writeSession({
    ...session,
    accessToken: refreshed.data.accessToken,
    refreshToken: refreshed.data.refreshToken,
  });

  return refreshed.data.accessToken;
}

export async function getCurrentSessionUser(): Promise<{ email: string; name: string } | null> {
  const session = await readSession();
  return session?.user ?? null;
}
