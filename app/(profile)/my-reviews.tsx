import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Review } from '@/constants/data';
import { useStore } from '@/store/useStore';

const ACCESSIBILITY_LABEL: Record<NonNullable<Review['accessibilityRating']>, string> = {
  yes: 'Полностью доступно',
  partial: 'Частично доступно',
  no: 'Недоступно',
  unknown: 'Не указано',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function MyReviewsScreen() {
  const getMyReviews = useStore((s) => s.getMyReviews);
  const deleteReview = useStore((s) => s.deleteReview);
  const [items, setItems] = useState<Review[]>([]);

  const load = useCallback(async () => {
    const reviews = await getMyReviews();
    setItems(reviews);
  }, [getMyReviews]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = (review: Review) => {
    Alert.alert('Удалить отзыв', `Удалить отзыв о «${review.placeName}»?`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          void deleteReview(review.id).then(load);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Мои отзывы</Text>
          <Text style={styles.headerSubtitle}>{items.length} отзывов</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Пока нет отзывов</Text>
            <Text style={styles.emptyText}>Оставьте отзыв в завершенной поездке на карточке места.</Text>
          </View>
        ) : (
          items.map((review) => (
            <View key={review.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.placeName}>{review.placeName}</Text>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(review)}>
                  <Ionicons name="trash-outline" size={16} color={Colors.error} />
                </TouchableOpacity>
              </View>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={`${review.id}-star-${star}`}
                    name={star <= review.rating ? 'star' : 'star-outline'}
                    size={14}
                    color="#F59E0B"
                  />
                ))}
                <Text style={styles.dateText}>{formatDate(review.createdAt)}</Text>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
              {(review.accessibilityRating || review.accessibilityComment) && (
                <View style={styles.accessibilityBox}>
                  <Text style={styles.accessibilityTitle}>
                    ♿ Доступность: {ACCESSIBILITY_LABEL[review.accessibilityRating ?? 'unknown']}
                  </Text>
                  {review.accessibilityComment ? (
                    <Text style={styles.accessibilityText}>{review.accessibilityComment}</Text>
                  ) : null}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: Typography.sizes.sm,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  emptyBox: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  emptyText: {
    marginTop: 4,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    color: Colors.text,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    flex: 1,
    marginRight: 8,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
  },
  ratingRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dateText: {
    marginLeft: 8,
    color: Colors.textTertiary,
    fontSize: Typography.sizes.xs,
  },
  reviewText: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  accessibilityBox: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
  },
  accessibilityTitle: {
    color: Colors.text,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  accessibilityText: {
    marginTop: 2,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
  },
});
