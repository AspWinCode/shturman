import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { POPULAR_CITIES, MOCK_ROUTES, MOCK_TRIPS } from '@/constants/data';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const user = useStore((s) => s.user);
  const trips = useStore((s) => s.trips);
  const upcomingTrips = trips.filter((t) => t.status === 'upcoming').slice(0, 1);
  const greeting = getGreeting();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero gradient header */}
        <View style={styles.hero}>
          {/* Top row */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.greeting}>{greeting}, {user.name || 'путешественник'}! 👋</Text>
              <Text style={styles.heroSubtext}>Куда отправимся дальше?</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* Create Trip CTA */}
          <TouchableOpacity
            style={styles.createTripCard}
            onPress={() => router.push('/trip/create')}
            activeOpacity={0.9}
          >
            <View style={styles.createTripContent}>
              <View style={styles.createTripIcon}>
                <Ionicons name="add" size={28} color={Colors.primary} />
              </View>
              <View style={styles.createTripText}>
                <Text style={styles.createTripTitle}>Спланировать поездку</Text>
                <Text style={styles.createTripSubtitle}>Пара параметров и готовый маршрут за минуту</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Поездок', value: trips.length.toString() },
              { label: 'Стран', value: '3' },
              { label: 'Дней', value: '18' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active trip */}
        {upcomingTrips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ближайшая поездка</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/trips')}>
                <Text style={styles.sectionLink}>Все →</Text>
              </TouchableOpacity>
            </View>
            {upcomingTrips.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                onPress={() => router.push(`/trip/${trip.id}`)}
                activeOpacity={0.9}
              >
                <View style={styles.upcomingCard}>
                  <Image
                    source={{ uri: trip.coverImage }}
                    style={styles.upcomingImage}
                  />
                  <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)'}]} />
                  <View style={styles.upcomingContent}>
                    <Badge label="Активна" variant="success" size="sm" />
                    <Text style={styles.upcomingCity}>{trip.to}</Text>
                    <View style={styles.upcomingMeta}>
                      <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.upcomingMetaText}>
                        {trip.startDate} — {trip.endDate}
                      </Text>
                      <Ionicons name="people-outline" size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.upcomingMetaText}>{trip.travelers}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular cities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Популярные направления</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {POPULAR_CITIES.map((city) => (
              <TouchableOpacity
                key={city.id}
                onPress={() => {
                  router.push({
                    pathname: '/trip/create',
                    params: { to: city.name },
                  });
                }}
                activeOpacity={0.85}
                style={styles.cityCard}
              >
                <Image source={{ uri: city.image }} style={styles.cityImage} />
                <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.35)'}]} />
                <View style={styles.cityInfo}>
                  <Text style={styles.cityEmoji}>{city.emoji}</Text>
                  <Text style={styles.cityName}>{city.name}</Text>
                  <Text style={styles.cityCountry}>{city.country}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended routes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Рекомендуемые маршруты</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/discover')}>
              <Text style={styles.sectionLink}>Все →</Text>
            </TouchableOpacity>
          </View>
          {MOCK_ROUTES.slice(0, 3).map((route) => (
            <TouchableOpacity
              key={route.id}
              onPress={() => router.push('/(tabs)/discover')}
              activeOpacity={0.85}
              style={styles.routeCard}
            >
              <Image source={{ uri: route.image }} style={styles.routeImage} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeTitle}>{route.title}</Text>
                <View style={styles.routeMeta}>
                  <View style={styles.routeMetaItem}>
                    <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.routeMetaText}>{route.duration}</Text>
                  </View>
                  <View style={styles.routeMetaItem}>
                    <Ionicons name="wallet-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.routeMetaText}>{route.budget}</Text>
                  </View>
                  <View style={styles.routeMetaItem}>
                    <Ionicons name="star" size={13} color={Colors.warning} />
                    <Text style={styles.routeMetaText}>{route.rating}</Text>
                  </View>
                </View>
                <View style={styles.routeTags}>
                  {route.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} label={tag} variant="primary" size="sm" />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/trip/create')}
        activeOpacity={0.9}
      >
        <View style={styles.fabGradient}>
          <Ionicons name="add" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    paddingTop: 60,
    paddingBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
    backgroundColor: Colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  heroSubtext: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  createTripCard: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  createTripContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: Spacing.md,
  },
  createTripIcon: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createTripText: {
    flex: 1,
  },
  createTripTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  createTripSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  sectionLink: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  upcomingCard: {
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  upcomingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  upcomingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    gap: 4,
  },
  upcomingCity: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  upcomingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  upcomingMetaText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  horizontalScroll: {
    gap: Spacing.md,
    paddingRight: Spacing.xl,
  },
  cityCard: {
    width: 130,
    height: 170,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cityInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
  },
  cityEmoji: {
    fontSize: 20,
  },
  cityName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: '#fff',
  },
  cityCountry: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  routeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  routeImage: {
    width: 100,
    height: 110,
    resizeMode: 'cover',
  },
  routeInfo: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  routeTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  routeMeta: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  routeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  routeMetaText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  routeTags: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: Spacing.xl,
    borderRadius: 32,
    ...Shadows.lg,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
  },
});




