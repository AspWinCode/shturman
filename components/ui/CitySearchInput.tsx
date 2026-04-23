import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { RUSSIAN_CITIES, CityOption } from '@/constants/data';

interface CitySearchInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onSelect: (city: string) => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  testID?: string;
}

export const CitySearchInput: React.FC<CitySearchInputProps> = ({
  label,
  placeholder = 'Начните вводить город...',
  value,
  onSelect,
  leftIcon = 'location-outline',
  error,
  testID,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const inputRef = useRef<TextInput>(null);

  const filterCities = (text: string): CityOption[] => {
    const lower = text.toLowerCase();
    return RUSSIAN_CITIES.filter((c) => c.name.toLowerCase().startsWith(lower)).slice(0, 8);
  };

  const openModal = () => {
    setQuery(value);
    setSuggestions(value.length >= 1 ? filterCities(value) : []);
    setModalVisible(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleChange = (text: string) => {
    setQuery(text);
    setSuggestions(text.length >= 1 ? filterCities(text) : []);
  };

  const handleSelect = (city: CityOption) => {
    onSelect(city.name);
    setModalVisible(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSelect('');
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TouchableOpacity
        testID={testID}
        style={[styles.inputContainer, !!value && styles.hasValue, error ? styles.errorBorder : null]}
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Ionicons
          name={leftIcon}
          size={20}
          color={value ? Colors.primary : Colors.textTertiary}
          style={styles.leftIcon}
        />
        <Text style={[styles.valueText, !value && styles.placeholderText]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        {value ? (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.();
              onSelect('');
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="chevron-down" size={16} color={Colors.textTertiary} />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchRow}>
              <Ionicons name={leftIcon} size={20} color={Colors.primary} style={styles.searchIcon} />
              <TextInput
                testID={testID ? `${testID}-search` : undefined}
                ref={inputRef}
                style={styles.searchInput}
                value={query}
                onChangeText={handleChange}
                placeholder={placeholder}
                placeholderTextColor={Colors.textTertiary}
                autoCapitalize="words"
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                  <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="always"
              style={styles.list}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  testID={testID ? `${testID}-option-${item.id}` : undefined}
                  style={[styles.suggestion, index < suggestions.length - 1 && styles.suggestionBorder]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="location-outline" size={16} color={Colors.textTertiary} style={styles.sugIcon} />
                  <View style={styles.sugText}>
                    <Text style={styles.sugCity}>{item.name}</Text>
                    <Text style={styles.sugRegion}>{item.region}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                query.length > 0 ? (
                  <Text style={styles.emptyText}>Город не найден</Text>
                ) : (
                  <Text style={styles.hintText}>Начните вводить название города</Text>
                )
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.md,
    minHeight: 52,
  },
  hasValue: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.surface,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  leftIcon: { marginRight: 10 },
  valueText: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  placeholderText: { color: Colors.textTertiary },
  error: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    maxHeight: '75%',
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.base,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    minHeight: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    paddingVertical: Spacing.sm,
    // @ts-ignore web only
    outlineStyle: 'none',
  },
  clearBtn: { padding: 4 },
  list: { paddingHorizontal: Spacing.base },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sugIcon: { marginRight: 12 },
  sugText: { flex: 1 },
  sugCity: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
  },
  sugRegion: {
    fontSize: Typography.sizes.xs,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textTertiary,
    fontSize: Typography.sizes.sm,
    paddingVertical: Spacing.xl,
  },
  hintText: {
    textAlign: 'center',
    color: Colors.textTertiary,
    fontSize: Typography.sizes.sm,
    paddingVertical: Spacing.xl,
  },
});
