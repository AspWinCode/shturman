import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/store/useStore';
import {
  PRODUCT_IDS,
  ProductSubscription,
  activateSubscriptionFromPurchase,
  destroyIAP,
  getSubscriptionProducts,
  initIAP,
  purchaseSubscription,
  restorePurchases,
} from '@/store/subscriptionService';
import { ensureAccessToken } from '@/store/authStorage';
import { apiValidateSubscription } from '@/store/authApi';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { track } from '@/store/analyticsService';
import { t } from '@/store/i18n';

const PERKS: Array<{ icon: keyof typeof Ionicons.glyphMap; text: string }> = [
  { icon: 'infinite-outline', text: 'Безлимитные поездки' },
  { icon: 'sparkles-outline', text: 'AI-генерация маршрутов' },
  { icon: 'cloud-offline-outline', text: 'Оффлайн-режим' },
  { icon: 'documents-outline', text: 'Travel Wallet (документы)' },
  { icon: 'notifications-outline', text: 'Приоритетная поддержка' },
];

function findProductPrice(products: ProductSubscription[], productId: string, fallback: string): string {
  const item = products.find((p) => p.id === productId);
  if (!item) return fallback;
  return item.displayPrice || fallback;
}

export default function PremiumScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const uiColors = colors;
  const subscription = useStore((s) => s.subscription);
  const loadSubscription = useStore((s) => s.loadSubscription);
  const activateSubscription = useStore((s) => s.activateSubscription);

  const [products, setProducts] = useState<ProductSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    void track('premium_screen_opened');
    let mounted = true;
    const bootstrap = async () => {
      await initIAP();
      const subs = await getSubscriptionProducts();
      if (!mounted) return;
      setProducts(subs);
      setInitializing(false);
    };
    void bootstrap();
    return () => {
      mounted = false;
      void destroyIAP();
    };
  }, []);

  const isActive = useMemo(() => {
    if (subscription.plan === 'none' || !subscription.expiresAt) return false;
    return new Date(subscription.expiresAt).getTime() > Date.now();
  }, [subscription.expiresAt, subscription.plan]);

  const monthlyLabel = `Месяц — ${findProductPrice(products, PRODUCT_IDS.monthly, '299 ₽')}`;
  const yearlyLabel = `Год — ${findProductPrice(products, PRODUCT_IDS.yearly, '1 990 ₽')} · экономия 42%`;

  const handleBuy = async (productId: string) => {
    void track('premium_purchase_started', { productId });
    setLoading(true);
    const result = await purchaseSubscription(productId);
    if (result.ok && result.purchase) {
      const resolvedProductId = result.purchase.productId
        || (Array.isArray(result.purchase.ids) ? result.purchase.ids[0] : null)
        || productId;
      const accessToken = await ensureAccessToken();
      const receiptData = result.purchase.purchaseToken ?? '';

      if (accessToken && receiptData && (resolvedProductId === PRODUCT_IDS.monthly || resolvedProductId === PRODUCT_IDS.yearly)) {
        const validation = await apiValidateSubscription(accessToken, {
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          receiptData,
          productId: resolvedProductId,
        });
        if (validation.ok && validation.data.active) {
          await activateSubscription(validation.data.plan, validation.data.expiresAt);
        } else {
          await activateSubscriptionFromPurchase(result.purchase);
        }
      } else {
        await activateSubscriptionFromPurchase(result.purchase);
      }
      await loadSubscription();
      void track('premium_purchase_completed', { productId: resolvedProductId });
      Alert.alert('Готово', 'Подписка Premium активирована.');
      router.back();
      setLoading(false);
      return;
    }
    if (result.message) {
      Alert.alert('Покупка', result.message);
    }
    setLoading(false);
  };

  const handleRestore = async () => {
    setLoading(true);
    const result = await restorePurchases();
    if (!result.ok) {
      Alert.alert('Восстановление', 'Не удалось восстановить покупки. Попробуйте позже.');
      setLoading(false);
      return;
    }
    if (result.active) {
      await loadSubscription();
      void track('premium_restore_success');
      Alert.alert('Восстановление', 'Активная подписка восстановлена.');
    } else {
      Alert.alert('Восстановление', 'Активные подписки не найдены.');
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: uiColors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: uiColors.surfaceAlt, borderColor: uiColors.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={uiColors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroIcon}>✨</Text>
        <Text style={[styles.heroTitle, { color: uiColors.text }]}>{t('premium.title')}</Text>
        <Text style={[styles.heroSub, { color: uiColors.textSecondary }]}>
          {isActive && subscription.expiresAt
            ? `Активна до ${new Date(subscription.expiresAt).toLocaleDateString('ru-RU')}`
            : 'Открой все возможности планировщика путешествий'}
        </Text>
      </View>

      <View style={[styles.perks, { backgroundColor: uiColors.surface, borderColor: uiColors.border }]}>
        {PERKS.map((perk, idx) => (
          <View
            key={perk.text}
            style={[
              styles.perkRow,
              idx < PERKS.length - 1 && { borderBottomWidth: 1, borderBottomColor: uiColors.border },
            ]}
          >
            <Ionicons name={perk.icon} size={22} color={uiColors.primary} />
            <Text style={[styles.perkText, { color: uiColors.text }]}>{perk.text}</Text>
          </View>
        ))}
      </View>

      {!isActive && (
        <View style={styles.actions}>
          {initializing ? (
            <ActivityIndicator color={uiColors.primary} />
          ) : (
            <>
              <TouchableOpacity
                style={[styles.buyBtn, { backgroundColor: uiColors.primary }, loading && styles.disabled]}
                onPress={() => void handleBuy(PRODUCT_IDS.monthly)}
                disabled={loading}
              >
                <Text style={styles.buyBtnText}>{monthlyLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buyBtn,
                  styles.buyBtnSecondary,
                  { borderColor: uiColors.primary },
                  loading && styles.disabled,
                ]}
                onPress={() => void handleBuy(PRODUCT_IDS.yearly)}
                disabled={loading}
              >
                <Text style={[styles.buyBtnText, { color: uiColors.primary }]}>{yearlyLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => void handleRestore()} disabled={loading}>
                <Text style={[styles.restoreText, { color: uiColors.textSecondary }]}>{t('premium.restore')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {loading && <ActivityIndicator style={styles.loader} color={uiColors.primary} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  header: {
    marginBottom: 4,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  heroIcon: {
    fontSize: 56,
  },
  heroTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: Typography.sizes.base,
    textAlign: 'center',
  },
  perks: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  perkText: {
    flex: 1,
    fontSize: Typography.sizes.base,
  },
  actions: {
    gap: Spacing.md,
  },
  buyBtn: {
    minHeight: 50,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  buyBtnSecondary: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buyBtnText: {
    color: '#fff',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
  },
  restoreText: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  loader: {
    marginTop: 8,
  },
});

