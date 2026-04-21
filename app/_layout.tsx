import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';
import { initializeTripsDb } from '@/store/tripsDb';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });
  const hydrateTrips = useStore((s) => s.hydrateTrips);
  const hydrateAuth = useStore((s) => s.hydrateAuth);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      if (!fontsLoaded) return;

      try {
        await initializeTripsDb();
        await hydrateAuth();
        await hydrateTrips();
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
    };
  }, [fontsLoaded, hydrateAuth, hydrateTrips]);

  if (!fontsLoaded || !appReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="trip" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
