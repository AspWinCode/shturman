import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import type { Place } from '@/constants/data';

interface AccessibilityPopupProps {
  place: Place | null;
  onClose: () => void;
}

function statusText(enabled: boolean): string {
  return enabled ? '✅' : '❌';
}

export function AccessibilityPopup({ place, onClose }: AccessibilityPopupProps) {
  if (!place?.accessible) return null;

  const info = place.accessible;

  return (
    <Modal visible={Boolean(place)} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>♿ Доступность: {place.name}</Text>
        <View style={styles.row}>
          <Text style={styles.itemLabel}>{statusText(info.wheelchair)} Доступно для колясочников</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemLabel}>{statusText(info.audioGuide)} Аудиогид для слабовидящих</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemLabel}>{statusText(info.braille)} Таблички Брайля</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemLabel}>{statusText(info.parkingNearby)} Парковка для инвалидов рядом</Text>
        </View>
        {info.notes ? <Text style={styles.notes}>{info.notes}</Text> : null}

        <TouchableOpacity
          onPress={onClose}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Закрыть окно доступности"
        >
          <Text style={styles.closeBtnText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: 10,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    backgroundColor: Colors.border,
    marginBottom: 6,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  row: {
    paddingVertical: 2,
  },
  itemLabel: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
  },
  notes: {
    marginTop: 4,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  closeBtn: {
    marginTop: 6,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  closeBtnText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
});
