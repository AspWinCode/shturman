import AsyncStorage from '@react-native-async-storage/async-storage';

export const PRODUCT_IDS = {
  monthly: 'com.shturman.app.premium_monthly',
  yearly: 'com.shturman.app.premium_yearly',
} as const;

export type SubscriptionPlan = 'none' | 'monthly' | 'yearly';

export interface SubscriptionState {
  plan: SubscriptionPlan;
  expiresAt: string | null;
  originalOrderId: string | null;
}

export interface WebPurchase {
  productId?: string;
  transactionId?: string;
  id?: string;
}

const SUBSCRIPTION_KEY = 'app.subscription.v1';
const EMPTY_SUBSCRIPTION: SubscriptionState = { plan: 'none', expiresAt: null, originalOrderId: null };
export const FREE_TRIP_LIMIT = 3;

export async function initIAP(): Promise<void> {}

export async function destroyIAP(): Promise<void> {}

export async function getSubscriptionProducts(): Promise<Array<{ id: string; displayPrice?: string }>> {
  return [];
}

export async function purchaseSubscription(
  _productId: string
): Promise<{ ok: boolean; purchase?: WebPurchase; message?: string }> {
  return { ok: false, message: 'IAP недоступен в браузере' };
}

export async function restorePurchases(): Promise<{ ok: boolean; active: boolean }> {
  return { ok: true, active: false };
}

export async function saveSubscriptionState(state: SubscriptionState): Promise<void> {
  await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(state));
}

export async function loadSubscriptionState(): Promise<SubscriptionState> {
  const raw = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
  if (!raw) return EMPTY_SUBSCRIPTION;
  try {
    const parsed = JSON.parse(raw) as SubscriptionState;
    if (!parsed || typeof parsed !== 'object') return EMPTY_SUBSCRIPTION;
    return {
      plan: parsed.plan ?? 'none',
      expiresAt: parsed.expiresAt ?? null,
      originalOrderId: parsed.originalOrderId ?? null,
    };
  } catch {
    return EMPTY_SUBSCRIPTION;
  }
}

export function isPremiumActive(state: SubscriptionState): boolean {
  if (state.plan === 'none') return false;
  if (!state.expiresAt) return false;
  return new Date(state.expiresAt).getTime() > Date.now();
}

export async function activateSubscriptionFromPurchase(
  purchase: WebPurchase
): Promise<void> {
  const productId = purchase.productId || '';
  const isMonthly = productId === PRODUCT_IDS.monthly;
  const isYearly = productId === PRODUCT_IDS.yearly;
  const plan: SubscriptionPlan = isMonthly ? 'monthly' : isYearly ? 'yearly' : 'none';
  if (plan === 'none') return;

  const expiresAt = new Date(
    Date.now() + (isMonthly ? 30 : 365) * 24 * 60 * 60 * 1000
  ).toISOString();

  await saveSubscriptionState({
    plan,
    expiresAt,
    originalOrderId: purchase.transactionId ?? purchase.id ?? null,
  });
}

export function countTripsThisMonth(trips: { startDate: string }[]): number {
  const now = new Date();
  return trips.filter((trip) => {
    const date = new Date(trip.startDate);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
}
