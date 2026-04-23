import React from 'react';
import { Platform } from 'react-native';

type SentryModule = {
  init: (options: Record<string, unknown>) => void;
  wrap: <P>(Component: React.ComponentType<P>) => React.ComponentType<P>;
};

let sentry: SentryModule | null | undefined;

function getSentry(): SentryModule | null {
  if (Platform.OS === 'web') return null;
  if (sentry !== undefined) return sentry;
  try {
    sentry = require('@sentry/react-native') as SentryModule;
  } catch {
    sentry = null;
  }
  return sentry;
}

export function initSentry(): void {
  const sdk = getSentry();
  if (!sdk) return;

  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  try {
    sdk.init({
      dsn,
      enableInExpoDevelopment: false,
      debug: false,
      tracesSampleRate: 0.2,
    });
  } catch (error) {
    console.warn('[Sentry] init failed', error);
  }
}

export function withSentryRoot<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  const sdk = getSentry();
  if (!sdk) return Component;
  try {
    return sdk.wrap(Component);
  } catch {
    return Component;
  }
}
