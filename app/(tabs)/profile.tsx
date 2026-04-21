import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { TRAVEL_STYLES, INTERESTS } from '@/constants/data';

const RUSTORE_URL = 'https://www.rustore.ru/catalog/app/com.travelai.app';
const SUPPORT_EMAIL = 'support@shturman.app';
const FAQ_URL = 'https://shturman.app/faq';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
  badge?: string;
}

export default function ProfileScreen() {
  const user = useStore((s) => s.user);
  const trips = useStore((s) => s.trips);
  const logout = useStore((s) => s.logout);
  const resetDemoData = useStore((s) => s.resetDemoData);
  const favorites = useStore((s) => s.favorites);
  const isGuest = !user.isLoggedIn;
  const canResetDemo = __DEV__ || process.env.EXPO_PUBLIC_ENABLE_DEMO_RESET === 'true';

  const travelStyle = TRAVEL_STYLES.find((s) => s.id === user.travelStyle);
  const userInterests = INTERESTS.filter((i) => user.interests.includes(i.id));

  // Реальная статистика из поездок
  const uniqueCountries = [...new Set(trips.map((t) => t.toCountry).filter(Boolean))].length;
  const totalDays = trips.reduce((sum, t) => sum + (t.days?.length ?? 0), 0);

  const stats = [
    { label: 'Поездок', value: trips.length.toString(), emoji: '✈️' },
    { label: 'Стран', value: uniqueCountries > 0 ? uniqueCountries.toString() : '—', emoji: '🌍' },
    { label: 'Избранных', value: favorites.length.toString(), emoji: '❤️' },
    { label: 'Дней', value: totalDays > 0 ? totalDays.toString() : '—', emoji: '📅' },
  ];

  const menuGroups: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Аккаунт',
      items: [
        {
          icon: 'person-outline',
          label: 'Редактировать профиль',
          subtitle: 'Имя, фото, email',
          onPress: () => router.push('/edit-profile' as never),
        },
        ...(
          isGuest
            ? []
            : [{
                icon: 'key-outline' as const,
                label: 'Смена пароля',
                subtitle: 'Обновить пароль',
                onPress: () => router.push({ pathname: '/change-password' } as never),
              }]
        ),
        {
          icon: 'heart-outline',
          label: 'Избранные маршруты',
          subtitle: favorites.length > 0 ? `${favorites.length} маршрутов` : 'Пока пусто',
          badge: favorites.length > 0 ? String(favorites.length) : undefined,
          onPress: () => router.push('/(tabs)/discover' as never),
        },
        {
          icon: 'wallet-outline',
          label: 'Travel Wallet',
          subtitle: 'Скоро — билеты и бронирования',
          onPress: () =>
            Alert.alert(
              'Travel Wallet',
              'Раздел для хранения билетов и бронирований появится в следующем обновлении.',
              [{ text: 'Понятно' }],
            ),
        },
      ],
    },
    {
      title: 'Предпочтения',
      items: [
        {
          icon: 'options-outline',
          label: 'Стиль путешествий',
          subtitle: travelStyle?.label || 'Стандарт',
          onPress: () => router.push('/edit-profile' as never),
        },
        {
          icon: 'notifications-outline',
          label: 'Уведомления',
          subtitle: 'Напоминания, изменения цен',
          onPress: () =>
            Alert.alert(
              'Уведомления',
              'Push-уведомления появятся в следующем обновлении приложения.',
              [{ text: 'Понятно' }],
            ),
        },
        {
          icon: 'language-outline',
          label: 'Язык приложения',
          subtitle: 'Русский',
          onPress: () =>
            Alert.alert('Язык', 'В текущей версии доступен только русский язык.', [
              { text: 'Понятно' },
            ]),
        },
      ],
    },
    {
      title: 'Поддержка',
      items: [
        {
          icon: 'help-circle-outline',
          label: 'Помощь и FAQ',
          onPress: () =>
            Linking.openURL(FAQ_URL).catch(() =>
              Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Вопрос по приложению Штурман`),
            ),
        },
        {
          icon: 'chatbubble-outline',
          label: 'Написать в поддержку',
          subtitle: SUPPORT_EMAIL,
          onPress: () =>
            Linking.openURL(
              `mailto:${SUPPORT_EMAIL}?subject=Обращение в поддержку Штурман`,
            ),
        },
        {
          icon: 'star-outline',
          label: 'Оценить приложение',
          onPress: () =>
            Linking.openURL(RUSTORE_URL).catch(() =>
              Alert.alert('Ошибка', 'Не удалось открыть RuStore.'),
            ),
        },
        {
          icon: 'shield-checkmark-outline',
          label: 'Политика конфиденциальности',
          onPress: () => router.push('/(legal)/privacy' as never),
        },
      ],
    },
    {
      title: '',
      items: [
        ...(
          canResetDemo
            ? [{
                icon: 'refresh-outline' as const,
                label: 'Сбросить демо-данные',
                subtitle: 'Удалить поездки и восстановить стартовые данные',
                danger: true,
                onPress: () => {
                  Alert.alert(
                    'Сброс демо-данных',
                    'Будут очищены текущие поездки и восстановлены демо-маршруты. Продолжить?',
                    [
                      { text: 'Отмена', style: 'cancel' },
                      {
                        text: 'Сбросить',
                        style: 'destructive',
                        onPress: async () => {
                          await resetDemoData();
                          Alert.alert('Готово', 'Демо-данные обновлены.');
                          router.replace('/(tabs)');
                        },
                      },
                    ]
                  );
                },
              }]
            : []
        ),
        ...(
          isGuest
            ? []
            : [{
                icon: 'log-out-outline' as const,
                label: 'Выйти',
                danger: true,
                onPress: () => {
                  Alert.alert('Выход', 'Вы уверены, что хотите выйти?', [
                    { text: 'Отмена', style: 'cancel' },
                    {
                      text: 'Выйти',
                      style: 'destructive',
                      onPress: () => {
                        void logout();
                        router.replace('/(auth)/login');
                      },
                    },
                  ]);
                },
              }]
        ),
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || 'user'}`,
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name || 'Путешественник'}</Text>
          <Text style={styles.userEmail}>{user.email || 'Войдите в аккаунт, чтобы синхронизировать данные'}</Text>

          {/* Premium badge */}
          {isGuest ? (
            <View style={styles.authCtaRow}>
              <TouchableOpacity style={styles.authBtnPrimary} onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.authBtnPrimaryText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.authBtnSecondary} onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.authBtnSecondaryText}>Регистрация</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.premiumBadge}>
              <View style={styles.premiumGradient}>
                <Text style={styles.premiumIcon}>✨</Text>
                <Text style={styles.premiumText}>Перейти на Premium</Text>
                <Ionicons name="chevron-forward" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        {userInterests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Интересы</Text>
            <View style={styles.interestsRow}>
              {userInterests.slice(0, 5).map((interest) => (
                <View key={interest.id} style={styles.interestBadge}>
                  <Text style={styles.interestEmoji}>{interest.icon}</Text>
                  <Text style={styles.interestLabel}>{interest.label}</Text>
                </View>
              ))}
              {userInterests.length > 5 && (
                <View style={[styles.interestBadge, { backgroundColor: Colors.surfaceAlt }]}>
                  <Text style={styles.interestLabel}>+{userInterests.length - 5}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Menu */}
        {menuGroups.map((group, gi) => (
          <View key={gi} style={styles.menuGroup}>
            {group.title ? (
              <Text style={styles.menuGroupTitle}>{group.title}</Text>
            ) : null}
            <View style={styles.menuCard}>
              {group.items.map((item, ii) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={styles.menuItem}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.menuIconContainer,
                        item.danger && { backgroundColor: '#FEE2E2' },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={item.danger ? Colors.error : Colors.primary}
                      />
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text
                        style={[
                          styles.menuItemLabel,
                          item.danger && { color: Colors.error },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item.subtitle && (
                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                    <View style={styles.menuItemRight}>
                      {item.badge && (
                        <View style={styles.menuBadge}>
                          <Text style={styles.menuBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                      {!item.danger && (
                        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                      )}
                    </View>
                  </TouchableOpacity>
                  {ii < group.items.length - 1 && <View style={styles.menuDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 70,
    paddingBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
    backgroundColor: Colors.primary,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.base,
  },
  premiumBadge: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  premiumGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
  },
  premiumIcon: {
    fontSize: 16,
  },
  premiumText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  authCtaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  authBtnPrimary: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  authBtnPrimaryText: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },
  authBtnSecondary: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  authBtnSecondaryText: {
    color: '#fff',
    fontWeight: Typography.weights.semibold,
    fontSize: Typography.sizes.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.xl,
    marginTop: -Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    ...Shadows.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statEmoji: {
    fontSize: 20,
  },
  statValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontWeight: Typography.weights.bold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  menuGroup: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  menuGroupTitle: {
    fontSize: 12,
    fontWeight: Typography.weights.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    ...Shadows.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
  },
  menuItemSubtitle: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: Typography.weights.bold,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.base + 40 + Spacing.md,
  },
});



