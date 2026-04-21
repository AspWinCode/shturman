import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';
import { Trip } from '@/constants/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type TabId = 'upcoming' | 'past';

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<TabId>('upcoming');
  const trips = useStore((s) => s.trips);
  const deleteTrip = useStore((s) => s.deleteTrip);

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming');
  const pastTrips = trips.filter((t) => t.status === 'past');
  const displayedTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мои поездки</Text>
        <Text style={styles.headerSubtitle}>
          {trips.length} поездок в профиле
        </Text>

        {/* Tab switcher */}
        <View style={styles.tabSwitcher}>
          {(['upcoming', 'past'] as TabId[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
            >
              <Text style={[styles.tabItemText, activeTab === tab && styles.tabItemTextActive]}>
                {tab === 'upcoming'
                  ? `Предстоящие (${upcomingTrips.length})`
                  : `Прошедшие (${pastTrips.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedTrips.length === 0 ? (
          <EmptyState
            tab={activeTab}
            onCreateTrip={() => router.push('/trip/create')}
          />
        ) : (
          displayedTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() => router.push(`/trip/${trip.id}`)}
              onDelete={() => deleteTrip(trip.id)}
            />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
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

function TripCard({
  trip,
  onPress,
  onDelete,
}: {
  trip: Trip;
  onPress: () => void;
  onDelete: () => void;
}) {
  const nights = Math.max(0, trip.days.length - 1);
  const total = trip.totalTransport + trip.totalHotel + trip.totalActivities + trip.totalFood;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.tripCard}
    >
      <View style={styles.tripImageContainer}>
        <Image source={{ uri: trip.coverImage }} style={styles.tripImage} />
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.25)'}]} />
        <View style={styles.tripImageBadge}>
          <Badge
            label={trip.status === 'upcoming' ? 'Активна' : 'Завершена'}
            variant={trip.status === 'upcoming' ? 'success' : 'neutral'}
            size="sm"
          />
        </View>
      </View>

      <View style={styles.tripInfo}>
        <View style={styles.tripHeader}>
          <View>
            <Text style={styles.tripRoute}>
              {trip.from} → {trip.to}
            </Text>
            <Text style={styles.tripCountry}>{trip.toCountry}</Text>
          </View>
          <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={18} color={Colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.tripMeta}>
          <View style={styles.tripMetaItem}>
            <Ionicons name="calendar-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.tripMetaText}>{trip.startDate}</Text>
          </View>
          <View style={styles.tripMetaItem}>
            <Ionicons name="moon-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.tripMetaText}>{nights} {nights === 1 ? 'ночь' : 'ночей'}</Text>
          </View>
          <View style={styles.tripMetaItem}>
            <Ionicons name="people-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.tripMetaText}>{trip.travelers} чел.</Text>
          </View>
        </View>

        <View style={styles.tripFooter}>
          <View style={styles.tripBudget}>
            <Text style={styles.tripBudgetLabel}>Бюджет</Text>
            <Text style={styles.tripBudgetValue}>{trip.budget.toLocaleString('ru-RU')} ₽</Text>
          </View>
          <View style={styles.tripBudget}>
            <Text style={styles.tripBudgetLabel}>Расходы</Text>
            <Text style={[styles.tripBudgetValue, { color: Colors.text }]}>
              {total.toLocaleString('ru-RU')} ₽
            </Text>
          </View>
          <TouchableOpacity style={styles.tripOpenBtn}>
            <Text style={styles.tripOpenText}>Открыть</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EmptyState({
  tab,
  onCreateTrip,
}: {
  tab: TabId;
  onCreateTrip: () => void;
}) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyEmoji}>{tab === 'upcoming' ? '🧳' : '📚'}</Text>
      <Text style={styles.emptyTitle}>
        {tab === 'upcoming' ? 'Нет предстоящих поездок' : 'Нет прошедших поездок'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {tab === 'upcoming'
          ? 'Создайте первую поездку и получите готовый план.'
          : 'Здесь появится история ваших завершенных путешествий.'}
      </Text>
      {tab === 'upcoming' && (
        <Button
          title="Создать поездку"
          onPress={onCreateTrip}
          size="md"
          fullWidth={false}
          style={{ marginTop: Spacing.lg }}
        />
      )}
    </View>
  );
}

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
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.base,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    padding: 3,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#fff',
  },
  tabItemText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  tabItemTextActive: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  tripCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.base,
    ...Shadows.card,
  },
  tripImageContainer: {
    height: 160,
    position: 'relative',
  },
  tripImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tripImageBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  tripInfo: {
    padding: Spacing.base,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  tripRoute: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  tripCountry: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  tripMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripMetaText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  tripFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.base,
  },
  tripBudget: {
    flex: 1,
  },
  tripBudgetLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  tripBudgetValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  tripOpenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: BorderRadius.lg,
  },
  tripOpenText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing['4xl'],
    paddingHorizontal: Spacing['2xl'],
  },
  emptyEmoji: {
    fontSize: 72,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: Spacing.xl,
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


