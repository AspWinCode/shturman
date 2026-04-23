import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Place, Review } from '@/constants/data';

interface AddReviewModalProps {
  visible: boolean;
  tripId: string;
  place: Place | null;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}

const ACCESSIBILITY_OPTIONS: Array<{ value: NonNullable<Review['accessibilityRating']>; label: string }> = [
  { value: 'yes', label: 'Полностью доступно' },
  { value: 'partial', label: 'Частично доступно' },
  { value: 'no', label: 'Недоступно' },
  { value: 'unknown', label: 'Не знаю' },
];

export function AddReviewModal({ visible, tripId, place, onClose, onSubmit }: AddReviewModalProps) {
  const [rating, setRating] = useState<Review['rating']>(5);
  const [text, setText] = useState('');
  const [accessibilityRating, setAccessibilityRating] =
    useState<NonNullable<Review['accessibilityRating']>>('unknown');
  const [accessibilityComment, setAccessibilityComment] = useState('');

  useEffect(() => {
    if (!visible) return;
    setRating(5);
    setText('');
    setAccessibilityRating('unknown');
    setAccessibilityComment('');
  }, [visible, place?.id]);

  if (!place) return null;

  const handleSubmit = () => {
    const reviewText = text.trim();
    if (!reviewText) return;

    const review: Review = {
      id: `review_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      tripId,
      placeId: place.id,
      placeName: place.name,
      rating,
      text: reviewText,
      photos: [],
      createdAt: new Date().toISOString(),
      accessibilityRating,
      accessibilityComment: accessibilityComment.trim() || undefined,
    };
    onSubmit(review);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Отзыв о: {place.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Text style={styles.sectionTitle}>Оценка</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star as Review['rating'])}
                  accessibilityLabel={`${star} звезд из 5`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: rating === star }}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={28}
                    color={star <= rating ? '#F59E0B' : Colors.border}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Комментарий</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите впечатления..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              value={text}
              onChangeText={setText}
            />

            <Text style={styles.sectionTitle}>♿ Доступность</Text>
            <View style={styles.accessibilityList}>
              {ACCESSIBILITY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.accessibilityItem}
                  onPress={() => setAccessibilityRating(option.value)}
                >
                  <Ionicons
                    name={accessibilityRating === option.value ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    color={accessibilityRating === option.value ? Colors.primary : Colors.textTertiary}
                  />
                  <Text style={styles.accessibilityLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Комментарий о доступности</Text>
            <TextInput
              style={[styles.input, styles.inputShort]}
              placeholder="Например: лифт не работал..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              value={accessibilityComment}
              onChangeText={setAccessibilityComment}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.submitBtn, text.trim().length === 0 && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={text.trim().length === 0}
            >
              <Text style={styles.submitBtnText}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    flex: 1,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginRight: 8,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceAlt,
  },
  content: {
    padding: Spacing.lg,
    gap: 10,
  },
  sectionTitle: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  input: {
    minHeight: 96,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  inputShort: {
    minHeight: 72,
  },
  accessibilityList: {
    gap: 8,
  },
  accessibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accessibilityLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
  },
  cancelBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
  },
  submitBtnDisabled: {
    opacity: 0.45,
  },
  submitBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: '#fff',
  },
});
