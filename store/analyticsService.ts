import { Platform } from 'react-native';

const IS_WEB = Platform.OS === 'web';

export type AnalyticsEvent =
  | 'trip_created'
  | 'trip_saved'
  | 'trip_deleted'
  | 'trip_shared'
  | 'ai_generation_started'
  | 'ai_generation_success'
  | 'ai_generation_fallback'
  | 'yandex_travel_click'
  | 'ostrovok_click'
  | 'yandex_navi_click'
  | 'premium_screen_opened'
  | 'premium_purchase_started'
  | 'premium_purchase_completed'
  | 'premium_restore_success'
  | 'accessibility_filter_used'
  | 'offline_mode_activated'
  | 'review_added'
  | 'wallet_document_added'
  | 'travel_mode_entered'
  | 'onboarding_completed';

export interface TrackParams {
  [key: string]: string | number | boolean | null | undefined;
}

type FirebaseAnalyticsModule = {
  default?: () => {
    logEvent: (name: string, params?: Record<string, unknown>) => Promise<void>;
    setUserId: (userId: string | null) => Promise<void>;
    logScreenView: (params: { screen_name: string; screen_class: string }) => Promise<void>;
  };
};

let cachedAnalytics:
  | {
      logEvent: (name: string, params?: Record<string, unknown>) => Promise<void>;
      setUserId: (userId: string | null) => Promise<void>;
      logScreenView: (params: { screen_name: string; screen_class: string }) => Promise<void>;
    }
  | null
  | undefined;

function getAnalytics() {
  if (IS_WEB) return null;
  if (cachedAnalytics !== undefined) return cachedAnalytics;
  try {
    const module = require('@react-native-firebase/analytics') as FirebaseAnalyticsModule;
    const factory = module.default;
    cachedAnalytics = typeof factory === 'function' ? factory() : null;
  } catch {
    cachedAnalytics = null;
  }
  return cachedAnalytics;
}

export async function track(event: AnalyticsEvent, params?: TrackParams): Promise<void> {
  const analytics = getAnalytics();
  if (!analytics) return;
  try {
    await analytics.logEvent(event, params ?? {});
  } catch (err) {
    console.warn('[Analytics] track error', event, err);
  }
}

export async function setAnalyticsUser(userId: string | null): Promise<void> {
  const analytics = getAnalytics();
  if (!analytics) return;
  try {
    await analytics.setUserId(userId);
  } catch {
    // no-op
  }
}

export async function trackScreen(screenName: string): Promise<void> {
  const analytics = getAnalytics();
  if (!analytics) return;
  try {
    await analytics.logScreenView({ screen_name: screenName, screen_class: screenName });
  } catch {
    // no-op
  }
}
