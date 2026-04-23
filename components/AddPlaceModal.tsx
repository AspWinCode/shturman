import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Place } from '@/constants/data';
import { DEFAULT_PLACES, getCityPlacesByName } from '@/constants/cityPlacesOsm';

interface AddPlaceModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (place: Place) => void;
  city: string;
  existingPlaceIds: string[];
  existingPlaceNames?: string[];
}

function slugify(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

export function AddPlaceModal({
  visible,
  onClose,
  onAdd,
  city,
  existingPlaceIds,
  existingPlaceNames = [],
}: AddPlaceModalProps) {
  const [query, setQuery] = useState('');

  const existingIdsSet = useMemo(() => new Set(existingPlaceIds), [existingPlaceIds]);
  const existingNamesSet = useMemo(
    () => new Set(existingPlaceNames.map((name) => name.trim().toLowerCase())),
    [existingPlaceNames]
  );

  const options = useMemo(() => {
    const pool = getCityPlacesByName(city) ?? DEFAULT_PLACES;
    const normalizedQuery = query.trim().toLowerCase();

    return pool
      .map((item, index) => {
        const id = `tpl-${slugify(city)}-${slugify(item.name)}-${index}`;
        return {
          id,
          name: item.name,
          category: item.category,
          description: item.description,
          duration: item.duration,
          rating: item.rating,
          emoji: item.emoji,
          price: item.price,
          address: item.address ?? city,
          lat: item.lat,
          lng: item.lng,
        };
      })
      .filter((item) => !existingIdsSet.has(item.id))
      .filter((item) => !existingNamesSet.has(item.name.trim().toLowerCase()))
      .filter((item) => {
        if (!normalizedQuery) return true;
        return (
          item.name.toLowerCase().includes(normalizedQuery)
          || item.category.toLowerCase().includes(normalizedQuery)
          || item.description.toLowerCase().includes(normalizedQuery)
        );
      });
  }, [city, query, existingIdsSet, existingNamesSet]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Добавить место</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>{city}</Text>

          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={16} color={Colors.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Поиск места"
              placeholderTextColor={Colors.textTertiary}
              style={styles.searchInput}
            />
          </View>

          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemCard}
                activeOpacity={0.85}
                onPress={() =>
                  onAdd({
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    duration: item.duration,
                    time: '',
                    rating: item.rating,
                    address: item.address,
                    emoji: item.emoji,
                    price: item.price,
                    lat: item.lat,
                    lng: item.lng,
                  })
                }
              >
                <View style={styles.itemTop}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <View style={styles.itemHeadText}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>{item.category}</Text>
                  </View>
                  <Text style={styles.itemRating}>★ {item.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.itemBottom}>
                  <Text style={styles.itemMeta}>{item.duration}</Text>
                  <Text style={styles.itemMeta}>{item.price || 'Бесплатно'}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Ничего не найдено</Text>
                <Text style={styles.emptyText}>Попробуйте другой запрос или очистите фильтр.</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    maxHeight: '86%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 42,
    color: Colors.text,
    fontSize: Typography.sizes.base,
  },
  listContent: {
    paddingBottom: Spacing.base,
    gap: Spacing.sm,
  },
  itemCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 6,
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemEmoji: {
    fontSize: 22,
  },
  itemHeadText: {
    flex: 1,
  },
  itemName: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.bold,
  },
  itemDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMeta: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  itemRating: {
    fontSize: Typography.sizes.sm,
    color: Colors.warning,
    fontWeight: Typography.weights.semibold,
  },
  emptyState: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    gap: 4,
  },
  emptyTitle: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.bold,
  },
  emptyText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
});
