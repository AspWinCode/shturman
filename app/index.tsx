import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';
import { useStore } from '@/store/useStore';

export default function IndexScreen() {
  const user = useStore((s) => s.user);
  const authHydrated = useStore((s) => s.authHydrated);

  useEffect(() => {
    if (!authHydrated) return;
    const timer = setTimeout(() => {
      if (user.isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)/welcome');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [authHydrated, user.isLoggedIn]);

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
