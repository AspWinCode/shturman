import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { MOCK_ROUTES, Route } from '@/constants/data';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

const FILTERS = ['Все', 'История', 'Природа', 'Еда', 'Море', 'Архитектура'];
const DURATION_FILTERS = ['Любая', '3-4 дня', '5-7 дней', '8+ дней'];

export default function DiscoverScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  const openRouteInBuilder = (route: Route) => {
    router.push({
      pathname: '/trip/create',
      params: {
        to: route.city,
        routeDuration: route.duration,
        routeBudget: route.budget,
        routeTags: route.tags.join(','),
      },
    });
  };

  const filteredRoutes = MOCK_ROUTES.filter((r) => {
    if (search && !r.city.toLowerCase().includes(search.toLowerCase()) &&
      !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter !== 'Все' && !r.tags.includes(activeFilter)) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Исследуйте</Text>
        <Text style={styles.headerSubtitle}>
          {MOCK_ROUTES.length} готовых маршрутов для вас
        </Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по городу или маршруту..."
            placeholderTextColor={Colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            >
              {activeFilter === f && (
                <View style={[StyleSheet.absoluteFill, {backgroundColor: Colors.primary}]} />
              )}
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured route (large card) */}
        {filteredRoutes.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Исследуйте</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.featuredCard}
              onPress={() => openRouteInBuilder(filteredRoutes[0])}
            >
              <Image source={{ uri: filteredRoutes[0].image }} style={styles.featuredImage} />
              <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.35)'}]} />
              <TouchableOpacity
                style={[styles.heartBtn, { top: 16, right: 16 }]}
                onPress={() => toggleFavorite(filteredRoutes[0].id)}
              >
                <Ionicons
                  name={favorites.includes(filteredRoutes[0].id) ? 'heart' : 'heart-outline'}
                  size={20}
                  color={favorites.includes(filteredRoutes[0].id) ? '#F5576C' : '#fff'}
                />
              </TouchableOpacity>
              <View style={styles.featuredInfo}>
                <View style={styles.featuredTags}>
                  {filteredRoutes[0].tags.map((tag) => (
                    <Badge key={tag} label={tag} size="sm" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999 }} />
                  ))}
                </View>
                <Text style={styles.featuredTitle}>{filteredRoutes[0].title}</Text>
                <View style={styles.featuredMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.featuredMetaText}>{filteredRoutes[0].duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="wallet-outline" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.featuredMetaText}>{filteredRoutes[0].budget}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={14} color={Colors.warning} />
                    <Text style={styles.featuredMetaText}>{filteredRoutes[0].rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* All routes grid */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>Все маршруты</Text>
          <View style={styles.routesGrid}>
            {filteredRoutes.slice(1).map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                isFavorite={favorites.includes(route.id)}
                onFavorite={() => toggleFavorite(route.id)}
                onOpen={() => openRouteInBuilder(route)}
              />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function RouteCard({
  route,
  isFavorite,
  onFavorite,
  onOpen,
}: {
  route: Route;
  isFavorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.routeCard}
      activeOpacity={0.88}
      onPress={onOpen}
    >
      <View style={styles.routeImageContainer}>
        <Image source={{ uri: route.image }} style={styles.routeImage} />
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.35)'}]} />
        <TouchableOpacity style={styles.heartBtn} onPress={onFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#F5576C' : '#fff'}
          />
        </TouchableOpacity>
        <View style={styles.routeSeasonBadge}>
          <Text style={styles.routeSeasonText}>{route.season}</Text>
        </View>
      </View>
      <View style={styles.routeCardInfo}>
        <Text style={styles.routeCardTitle} numberOfLines={1}>{route.title}</Text>
        <View style={styles.routeCardMeta}>
          <Text style={styles.routeCardDuration}>🕒 {route.duration}</Text>
          <Text style={styles.routeCardBudget}>💰 {route.budget}</Text>
        </View>
        <View style={styles.routeCardBottom}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={Colors.warning} />
            <Text style={styles.ratingText}>{route.rating}</Text>
            <Text style={styles.reviewsText}>({route.reviews})</Text>
          </View>
          <TouchableOpacity style={styles.useBtn} onPress={onOpen}>
            <Text style={styles.useBtnText}>Открыть</Text>
            <Ionicons name="arrow-forward" size={13} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const CARD_WIDTH = (width - Spacing.xl * 2 - Spacing.md) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.base,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: Typography.sizes.base,
    color: Colors.text,
  },
  filtersScroll: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  filterChipActive: {
    borderColor: 'transparent',
  },
  filterText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: '#fff',
  },
  featuredSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  featuredCard: {
    height: 240,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
  },
  featuredTags: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  featuredTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: 6,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredMetaText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.9)',
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridSection: {
    paddingHorizontal: Spacing.xl,
  },
  routesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  routeCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.card,
  },
  routeImageContainer: {
    height: 140,
    position: 'relative',
  },
  routeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  routeSeasonBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  routeSeasonText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
  },
  routeCardInfo: {
    padding: Spacing.sm,
  },
  routeCardTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  routeCardMeta: {
    gap: 2,
    marginBottom: 8,
  },
  routeCardDuration: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  routeCardBudget: {
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
  routeCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  reviewsText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  useBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  useBtnText: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
});

