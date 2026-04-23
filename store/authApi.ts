type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

const API_BASE = process.env.EXPO_PUBLIC_AUTH_API_URL || 'http://localhost:8787';
const API_TIMEOUT_MS = 6000;

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      signal: controller.signal,
      ...init,
    });
    const body = (await res.json()) as T & { message?: string };
    if (!res.ok) {
      return { ok: false, message: body?.message || `HTTP ${res.status}` };
    }
    return { ok: true, data: body as T };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, message: 'API timeout' };
    }
    return { ok: false, message: error instanceof Error ? error.message : 'Network error' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function healthcheckAuthApi() {
  return request<{ ok: boolean; service: string }>('/health', { method: 'GET' });
}

export async function apiRegister(name: string, email: string, password: string) {
  return request<{ ok: true; user: { id: string; name: string; email: string } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function apiLogin(email: string, password: string) {
  return request<{
    ok: true;
    user: { id: string; name: string; email: string };
    accessToken: string;
    refreshToken: string;
  }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRefresh(refreshToken: string) {
  return request<{ ok: true; accessToken: string; refreshToken: string }>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

export async function apiLogout(refreshToken: string) {
  return request<{ ok: true }>('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

export async function apiRecover(email: string, newPassword: string) {
  return request<{ ok: true }>('/auth/recover', {
    method: 'POST',
    body: JSON.stringify({ email, newPassword }),
  });
}

export async function apiChangePassword(accessToken: string, currentPassword: string, newPassword: string) {
  return request<{ ok: true }>('/auth/change-password', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function apiOAuthLogin(
  provider: 'yandex' | 'google' | 'apple',
  idToken: string,
  user: { email: string; name: string }
) {
  return request<{
    ok: true;
    user: { id: string; name: string; email: string };
    accessToken: string;
    refreshToken: string;
    provider: string;
  }>('/auth/oauth', {
    method: 'POST',
    body: JSON.stringify({ provider, idToken, user }),
  });
}

export async function apiDeleteAccount(accessToken: string) {
  return request<{ ok: true; message: string }>('/auth/delete-account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function apiValidateSubscription(
  accessToken: string,
  payload: { platform: 'ios' | 'android'; receiptData: string; productId: string }
) {
  return request<{ ok: true; active: boolean; expiresAt: string; plan: 'monthly' | 'yearly' }>(
    '/subscription/validate',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(payload),
    }
  );
}
