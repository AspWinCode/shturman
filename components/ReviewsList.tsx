import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Review } from '@/constants/data';
import { useStore } from '@/store/useStore';

interface ReviewsListProps {
  placeId: string;
  refreshToken?: number;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const ACCESSIBILITY_LABEL: Record<NonNullable<Review['accessibilityRating']>, string> = {
  yes: 'Полностью доступно',
  partial: 'Частично доступно',
  no: 'Недоступно',
  unknown: 'Не указано',
};

function ReviewsListInner({ placeId, refreshToken = 0 }: ReviewsListProps) {
  const getReviewsForPlace = useStore((s) => s.getReviewsForPlace);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let active = true;
    getReviewsForPlace(placeId)
      .then((items) => {
        if (!active) return;
        setReviews(items);
      })
      .catch(() => {
        if (!active) return;
        setReviews([]);
      });
    return () => {
      active = false;
    };
  }, [getReviewsForPlace, placeId, refreshToken]);

  if (reviews.length === 0) return null;

  return (
    <View style={styles.wrap}>
      {reviews.map((review) => (
        <View key={review.id} style={styles.card}>
          <View style={styles.header}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={`${review.id}-star-${star}`}
                  name={star <= review.rating ? 'star' : 'star-outline'}
                  size={12}
                  color="#F59E0B"
                />
              ))}
            </View>
            <Text style={styles.dateText}>{formatDate(review.createdAt)}</Text>
          </View>
          <Text style={styles.text}>{review.text}</Text>
          {(review.accessibilityRating || review.accessibilityComment) && (
            <View style={styles.accessibilityBox}>
              <Text style={styles.accessibilityTitle}>♿ {ACCESSIBILITY_LABEL[review.accessibilityRating ?? 'unknown']}</Text>
              {review.accessibilityComment ? (
                <Text style={styles.accessibilityComment}>{review.accessibilityComment}</Text>
              ) : null}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export const ReviewsList = React.memo(ReviewsListInner);

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    gap: 8,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  dateText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
  },
  text: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  accessibilityBox: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 6,
  },
  accessibilityTitle: {
    fontSize: Typography.sizes.xs,
    color: Colors.text,
    fontWeight: Typography.weights.semibold,
  },
  accessibilityComment: {
    marginTop: 2,
    fontSize: Typography.sizes.xs,
    color: Colors.textSecondary,
  },
});
