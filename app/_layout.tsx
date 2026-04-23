import { useEffect, useState } from 'react';
import { Stack, useRootNavigationState, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useStore } from '@/store/useStore';
import { initializeTripsDb } from '@/store/tripsDb';
import { initWalletDb } from '@/store/walletDb';
import { initReviewsDb } from '@/store/reviewsDb';
import { useTheme } from '@/hooks/useTheme';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { OfflineBanner } from '@/components/OfflineBanner';
import { initSentry, withSentryRoot } from '@/store/sentryService';

initSentry();

SplashScreen.preventAutoHideAsync();

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timeout`)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

export default withSentryRoot(RootLayout);

function RootLayoutContent() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });
  const hydrateTrips = useStore((s) => s.hydrateTrips);
  const hydrateAuth = useStore((s) => s.hydrateAuth);
  const [appReady, setAppReady] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const isNavigationReady = Boolean(rootNavigationState?.key);

  useEffect(() => {
    let isMounted = true;
    const hardTimeout = setTimeout(() => {
      if (!isMounted) return;
      setAppReady(true);
      void SplashScreen.hideAsync();
    }, 10000);

    const bootstrap = async () => {
      if (!fontsLoaded) return;

      try {
        await withTimeout(initializeTripsDb(), 7000, 'initializeTripsDb');
        await withTimeout(initWalletDb(), 5000, 'initWalletDb');
        await withTimeout(initReviewsDb(), 5000, 'initReviewsDb');
        await withTimeout(hydrateAuth(), 8000, 'hydrateAuth');
        await withTimeout(hydrateTrips(), 9000, 'hydrateTrips');
      } catch (error) {
        console.warn('App bootstrap failed', error);
      } finally {
        if (isMounted) {
          setAppReady(true);
          await SplashScreen.hideAsync();
        }
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
      clearTimeout(hardTimeout);
    };
  }, [fontsLoaded, hydrateAuth, hydrateTrips]);

  useEffect(() => {
    if (Platform.OS === 'web' || !appReady || !isNavigationReady) return;
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      if (data?.tripId && typeof data.tripId === 'string') {
        router.push(`/trip/${data.tripId}`);
      }
    });
    return () => sub.remove();
  }, [appReady, isNavigationReady, router]);

  useEffect(() => {
    if (Platform.OS === 'web' || !appReady || !isNavigationReady) return;
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response) return;
      const data = response.notification.request.content.data;
      if (data?.tripId && typeof data.tripId === 'string') {
        router.replace(`/trip/${data.tripId}`);
      }
    }).catch(() => {});
  }, [appReady, isNavigationReady, router]);

  if (!appReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <OfflineBanner />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(premium)" />
          <Stack.Screen name="trip" />
          <Stack.Screen name="travel-mode" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
