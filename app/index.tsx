import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router, useRootNavigationState } from 'expo-router';
import Colors from '@/constants/colors';
import { useStore } from '@/store/useStore';

export default function IndexScreen() {
  const user = useStore((s) => s.user);
  const authHydrated = useStore((s) => s.authHydrated);
  const rootNavigationState = useRootNavigationState();
  const isNavigationReady = Boolean(rootNavigationState?.key);

  useEffect(() => {
    if (!isNavigationReady) return;

    const navigate = () => {
      if (user.isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)/welcome');
      }
    };

    if (authHydrated) {
      const timer = setTimeout(navigate, 200);
      return () => clearTimeout(timer);
    }

    // Fallback: prevent infinite spinner when hydration is blocked.
    const fallbackTimer = setTimeout(navigate, 6000);
    return () => clearTimeout(fallbackTimer);
  }, [authHydrated, user.isLoggedIn, isNavigationReady]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
