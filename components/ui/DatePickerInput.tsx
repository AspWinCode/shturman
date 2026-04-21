import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

interface DatePickerInputProps {
  label: string;
  value: string; // ISO: YYYY-MM-DD
  onChange: (date: string) => void;
  minDate?: string;
  error?: string;
  placeholder?: string;
}

const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];
const DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function formatDisplay(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_GENITIVE[m - 1]} ${y}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  // 0=Mon, 6=Sun
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  minDate,
  error,
  placeholder = 'Выберите дату',
}) => {
  const today = new Date();
  const initYear = value ? parseInt(value.split('-')[0]) : today.getFullYear();
  const initMonth = value ? parseInt(value.split('-')[1]) - 1 : today.getMonth();

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);

  const minDateObj = minDate ? new Date(minDate) : today;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(v => v - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(v => v + 1);
  };

  const handleDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    setOpen(false);
  };

  const isDisabled = (day: number): boolean => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const min = new Date(minDateObj);
    min.setHours(0, 0, 0, 0);
    return d < min;
  };

  const isSelected = (day: number): boolean => {
    if (!value) return false;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return iso === value;
  };

  const isToday = (day: number): boolean => {
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.inputContainer, !!value && styles.hasValue, error ? styles.errorBorder : null]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color={value ? Colors.primary : Colors.textTertiary}
          style={styles.leftIcon}
        />
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value ? formatDisplay(value) : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={Colors.textTertiary} />
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.calendar} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View style={styles.calHeader}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={20} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.calTitle}>
                {MONTHS_RU[viewMonth]} {viewYear}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>

            {/* Day names */}
            <View style={styles.dayNames}>
              {DAYS_RU.map((d) => (
                <Text key={d} style={[styles.dayName, (d === 'Сб' || d === 'Вс') && styles.dayNameWeekend]}>
                  {d}
                </Text>
              ))}
            </View>

            {/* Days grid */}
            <View style={styles.grid}>
              {cells.map((day, i) => {
                if (!day) return <View key={`e-${i}`} style={styles.cell} />;
                const selected = isSelected(day);
                const disabled = isDisabled(day);
                const todayCell = isToday(day);
                return (
                  <TouchableOpacity
                    key={`d-${day}`}
                    style={[
                      styles.cell,
                      selected && styles.cellSelected,
                      todayCell && !selected && styles.cellToday,
                      disabled && styles.cellDisabled,
                    ]}
                    onPress={() => !disabled && handleDay(day)}
                    activeOpacity={disabled ? 1 : 0.7}
                  >
                    <Text style={[
                      styles.cellText,
                      selected && styles.cellTextSelected,
                      disabled && styles.cellTextDisabled,
                      todayCell && !selected && styles.cellTextToday,
                    ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              {value && (
                <TouchableOpacity onPress={() => { onChange(''); setOpen(false); }} style={styles.clearAction}>
                  <Text style={styles.clearActionText}>Очистить</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setOpen(false)} style={styles.closeAction}>
                <Text style={styles.closeActionText}>Готово</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
    flex: 1,
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
  leftIcon: {
    marginRight: 10,
  },
  valueText: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  placeholderText: {
    color: Colors.textTertiary,
  },
  error: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  calendar: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingVertical: 4,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  dayNames: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textTertiary,
    paddingVertical: 4,
  },
  dayNameWeekend: {
    color: Colors.error,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.sm,
  },
  cellSelected: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
  },
  cellToday: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  cellDisabled: {
    opacity: 0.3,
  },
  cellText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
  },
  cellTextSelected: {
    color: '#fff',
    fontWeight: Typography.weights.bold,
  },
  cellTextDisabled: {
    color: Colors.textTertiary,
  },
  cellTextToday: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  clearAction: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
  },
  clearActionText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  closeAction: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  closeActionText: {
    fontSize: Typography.sizes.sm,
    color: '#fff',
    fontWeight: Typography.weights.semibold,
  },
});

