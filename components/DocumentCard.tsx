import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { DOCUMENT_TYPE_LABELS, TripDocument } from '@/constants/data';

interface DocumentCardProps {
  doc: TripDocument;
  onOpen: () => void;
  onDelete: () => void;
}

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 КБ';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function DocumentCard({ doc, onOpen, onDelete }: DocumentCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
      <View style={styles.headerRow}>
        <Text style={[styles.typeLabel, { color: colors.textSecondary }]}>{DOCUMENT_TYPE_LABELS[doc.type]}</Text>
      </View>
      <Text style={[styles.fileName, { color: colors.text }]} numberOfLines={2}>{doc.name}</Text>
      <View style={styles.metaRow}>
        <Text style={[styles.metaText, { color: colors.textTertiary }]}>{formatFileSize(doc.sizeBytes)}</Text>
        <Text style={[styles.metaDot, { color: colors.textTertiary }]}>•</Text>
        <Text style={[styles.metaText, { color: colors.textTertiary }]}>{formatDate(doc.uploadedAt)}</Text>
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.openBtn, { borderColor: `${colors.primary}40`, backgroundColor: `${colors.primary}12` }]}
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel={`Открыть документ ${doc.name}`}
        >
          <Ionicons name="open-outline" size={16} color={colors.primary} />
          <Text style={[styles.openBtnText, { color: colors.primary }]}>Открыть</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteBtn, { borderColor: `${colors.error}40`, backgroundColor: `${colors.error}12` }]}
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={`Удалить документ ${doc.name}`}
        >
          <Ionicons name="trash-outline" size={16} color={colors.error} />
          <Text style={[styles.deleteBtnText, { color: colors.error }]}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  fileName: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: Typography.sizes.xs,
  },
  metaDot: {
    fontSize: Typography.sizes.xs,
  },
  actionsRow: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 8,
  },
  openBtn: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  openBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  deleteBtn: {
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  deleteBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
