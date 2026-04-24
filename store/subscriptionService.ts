import AsyncStorage from '@react-native-async-storage/async-storage';

export const PRODUCT_IDS = {
  monthly: 'com.shturman.app.premium_monthly',
  yearly: 'com.shturman.app.premium_yearly',
} as const;

export type SubscriptionPlan = 'none' | 'monthly' | 'yearly';

export type ProductSubscription = {
  id: string;
  displayPrice?: string;
};

export type Purchase = {
  productId?: string;
  ids?: string[];
  purchaseToken?: string;
  transactionId?: string;
  id?: string;
  expirationDateIOS?: number;
};

export interface SubscriptionState {
  plan: SubscriptionPlan;
  expiresAt: string | null;
  originalOrderId: string | null;
}

const SUBSCRIPTION_KEY = 'app.subscription.v1';
const EMPTY_SUBSCRIPTION: SubscriptionState = { plan: 'none', expiresAt: null, originalOrderId: null };
export const FREE_TRIP_LIMIT = 3;

function resolvePurchaseProductId(purchase: Purchase): string | null {
  if (purchase.productId) return purchase.productId;
  if (Array.isArray(purchase.ids) && purchase.ids.length > 0) return purchase.ids[0] ?? null;
  return null;
}

export async function initIAP(): Promise<void> {
  // Mobile IAP SDK is temporarily disabled in this build.
}

export async function destroyIAP(): Promise<void> {
  // no-op
}

export async function getSubscriptionProducts(): Promise<ProductSubscription[]> {
  return [
    { id: PRODUCT_IDS.monthly, displayPrice: '299 ₽' },
    { id: PRODUCT_IDS.yearly, displayPrice: '1 990 ₽' },
  ];
}

export async function purchaseSubscription(
  productId: string
): Promise<{ ok: boolean; purchase?: Purchase; message?: string }> {
  void productId;
  return { ok: false, message: 'Покупки временно недоступны в этой сборке.' };
}

export async function restorePurchases(): Promise<{ ok: boolean; active: boolean }> {
  const state = await loadSubscriptionState();
  return { ok: true, active: isPremiumActive(state) };
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
  purchase: Purchase
): Promise<void> {
  const productId = resolvePurchaseProductId(purchase) ?? '';
  const isMonthly = productId === PRODUCT_IDS.monthly;
  const isYearly = productId === PRODUCT_IDS.yearly;
  const plan: SubscriptionPlan = isMonthly ? 'monthly' : isYearly ? 'yearly' : 'none';

  if (plan === 'none') return;

  const expirationDateMs =
    typeof purchase.expirationDateIOS === 'number'
      ? purchase.expirationDateIOS
      : Date.now() + (isMonthly ? 30 : 365) * 24 * 60 * 60 * 1000;

  const nextState: SubscriptionState = {
    plan,
    expiresAt: new Date(expirationDateMs).toISOString(),
    originalOrderId: purchase.transactionId ?? purchase.id ?? null,
  };

  await saveSubscriptionState(nextState);
}

export function countTripsThisMonth(trips: { startDate: string }[]): number {
  const now = new Date();
  return trips.filter((trip) => {
    const date = new Date(trip.startDate);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
}
