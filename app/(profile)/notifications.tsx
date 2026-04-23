import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import {
  getNotificationPrefs,
  requestNotificationPermission,
  setNotificationPref,
} from '@/store/notificationsService';

type PrefState = {
  sevenDays: boolean;
  oneDay: boolean;
  departure: boolean;
  review: boolean;
};

export default function NotificationSettingsScreen() {
  const [loading, setLoading] = useState(true);
  const [prefs, setPrefs] = useState<PrefState>({
    sevenDays: true,
    oneDay: true,
    departure: true,
    review: true,
  });

  useEffect(() => {
    getNotificationPrefs()
      .then((value) => setPrefs(value))
      .finally(() => setLoading(false));
  }, []);

  const togglePref = async (key: keyof PrefState, value: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    await setNotificationPref(key, value);
    if (value) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert('Уведомления отключены', 'Разрешите уведомления в настройках устройства.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Назад"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Уведомления</Text>
          <Text style={styles.headerSubtitle}>Напоминания о поездках</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.content}>
          <SettingRow
            title="За 7 дней до поездки"
            value={prefs.sevenDays}
            onChange={(v) => togglePref('sevenDays', v)}
          />
          <SettingRow
            title="За 1 день до поездки"
            value={prefs.oneDay}
            onChange={(v) => togglePref('oneDay', v)}
          />
          <SettingRow
            title="В день старта"
            value={prefs.departure}
            onChange={(v) => togglePref('departure', v)}
          />
          <SettingRow
            title="Запрос отзыва после поездки"
            value={prefs.review}
            onChange={(v) => togglePref('review', v)}
          />
          <Text style={styles.note}>
            Новые настройки применяются к следующим сохранениям поездки.
          </Text>
        </View>
      )}
    </View>
  );
}

function SettingRow({
  title,
  value,
  onChange,
}: {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 52,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    fontSize: Typography.sizes.sm,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  row: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  rowTitle: {
    flex: 1,
    color: Colors.text,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  note: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
    marginTop: Spacing.sm,
  },
});
