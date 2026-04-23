import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';

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

const SUBSCRIPTION_KEY = 'app.subscription.v1';
const EMPTY_SUBSCRIPTION: SubscriptionState = { plan: 'none', expiresAt: null, originalOrderId: null };
export const FREE_TRIP_LIMIT = 3;

function resolvePurchaseProductId(purchase: RNIap.Purchase): string | null {
  if (purchase.productId) return purchase.productId;
  if (Array.isArray(purchase.ids) && purchase.ids.length > 0) return purchase.ids[0] ?? null;
  return null;
}

export async function initIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await RNIap.initConnection();
  } catch (err) {
    console.warn('[IAP] initConnection failed', err);
  }
}

export async function destroyIAP(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await RNIap.endConnection();
  } catch {
    // no-op
  }
}

export async function getSubscriptionProducts(): Promise<RNIap.ProductSubscription[]> {
  if (Platform.OS === 'web') return [];
  try {
    const products = await RNIap.fetchProducts({
      skus: [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly],
      type: 'subs',
    });
    return (products ?? []).filter((item): item is RNIap.ProductSubscription => {
      if (!item) return false;
      const id = item.id;
      return id === PRODUCT_IDS.monthly || id === PRODUCT_IDS.yearly;
    });
  } catch (err) {
    console.warn('[IAP] fetchProducts failed', err);
    return [];
  }
}

export async function purchaseSubscription(
  productId: string
): Promise<{ ok: boolean; purchase?: RNIap.Purchase; message?: string }> {
  if (Platform.OS === 'web') {
    return { ok: false, message: 'IAP недоступен в браузере' };
  }

  try {
    const purchase = await RNIap.requestPurchase({
      type: 'subs',
      request: Platform.select({
        ios: { ios: { sku: productId } },
        android: { android: { skus: [productId] } },
        default: { ios: { sku: productId } },
      })!,
    });

    const normalized = Array.isArray(purchase) ? purchase[0] : purchase;
    if (!normalized) return { ok: false, message: 'Покупка не завершена' };

    return { ok: true, purchase: normalized };
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    if (e?.code === 'user-cancelled' || e?.code === 'E_USER_CANCELLED') {
      return { ok: false, message: 'Отменено пользователем' };
    }
    console.warn('[IAP] requestPurchase failed', err);
    return { ok: false, message: 'Ошибка покупки. Попробуйте позже.' };
  }
}

export async function restorePurchases(): Promise<{ ok: boolean; active: boolean }> {
  if (Platform.OS === 'web') return { ok: true, active: false };

  try {
    const purchases = await RNIap.getAvailablePurchases();
    const validIds = new Set<string>(Object.values(PRODUCT_IDS));
    const activePurchase = purchases.find((purchase) => {
      const productId = resolvePurchaseProductId(purchase);
      if (!productId || !validIds.has(productId)) return false;
      const expiration =
        'expirationDateIOS' in purchase && typeof purchase.expirationDateIOS === 'number'
          ? purchase.expirationDateIOS
          : null;
      if (!expiration) return true;
      return expiration > Date.now();
    });

    if (!activePurchase) return { ok: true, active: false };

    await activateSubscriptionFromPurchase(activePurchase);
    return { ok: true, active: true };
  } catch (err) {
    console.warn('[IAP] restorePurchases failed', err);
    return { ok: false, active: false };
  }
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
  purchase: RNIap.Purchase
): Promise<void> {
  const productId = resolvePurchaseProductId(purchase) ?? '';
  const isMonthly = productId === PRODUCT_IDS.monthly;
  const isYearly = productId === PRODUCT_IDS.yearly;
  const plan: SubscriptionPlan = isMonthly ? 'monthly' : isYearly ? 'yearly' : 'none';

  if (plan === 'none') return;

  const expirationDateMs =
    'expirationDateIOS' in purchase && typeof purchase.expirationDateIOS === 'number'
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
