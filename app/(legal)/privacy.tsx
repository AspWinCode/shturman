import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

const LAST_UPDATED = '22 апреля 2026 г.';
const APP_NAME = 'Штурман';
const CONTACT_EMAIL = 'privacy@shturman.app';

interface Section {
  title: string;
  body: string;
}

const SECTIONS: Section[] = [
  {
    title: '1. Какие данные мы собираем',
    body:
      'При использовании приложения мы можем обрабатывать:\n\n' +
      '• email и имя профиля (при регистрации)\n' +
      '• параметры поездки: город, даты, количество путешественников, бюджет\n' +
      '• пользовательские предпочтения (интересы, стиль поездки)\n' +
      '• технические данные устройства и версии приложения для стабильной работы\n\n' +
      'Мы не храним данные банковских карт и не собираем геолокацию без явного действия пользователя.',
  },
  {
    title: '2. Для чего используются данные',
    body:
      'Данные используются только для:\n\n' +
      '• генерации маршрутов и рекомендаций\n' +
      '• сохранения ваших поездок и настроек\n' +
      '• расчета бюджета и отображения вариантов транспорта и проживания\n' +
      '• технической поддержки и диагностики ошибок\n\n' +
      'Мы не продаем персональные данные третьим лицам.',
  },
  {
    title: '3. Интеграции и внешние сервисы',
    body:
      'Для поиска и бронирования приложение использует переходы во внешние сервисы:\n\n' +
      '• Яндекс Путешествия (транспорт и отели): travel.yandex.ru\n' +
      '• Яндекс Расписания (рейсы/поезда/автобусы): rasp.yandex.ru\n' +
      '• Островок (отели): ostrovok.ru\n\n' +
      'При переходе действуют политики конфиденциальности соответствующих сервисов. ' +
      'Мы передаем только параметры поиска (маршрут, даты, число гостей), необходимые для открытия результатов.',
  },
  {
    title: '4. Хранение и защита',
    body:
      'Данные аккаунта и поездок хранятся в инфраструктуре приложения и/или локально на устройстве в пределах функциональности. ' +
      'Для защиты используются шифрование трафика (HTTPS), ограничение доступа и токены авторизации.',
  },
  {
    title: '5. Ваши права',
    body:
      'Вы можете:\n\n' +
      '• запросить удаление аккаунта и связанных данных\n' +
      '• запросить выгрузку своих данных\n' +
      '• изменить профиль и настройки в приложении\n\n' +
      'По вопросам обработки данных пишите на ' +
      CONTACT_EMAIL +
      '.',
  },
  {
    title: '6. Обновления политики',
    body:
      'Мы можем обновлять эту политику. Актуальная версия всегда доступна в приложении. ' +
      'Продолжая пользоваться сервисом после обновления, вы принимаете новую редакцию.',
  },
];

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 370;
  const horizontalPadding = isCompact ? Spacing.lg : Spacing.xl;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Политика конфиденциальности</Text>
          <Text style={styles.headerSubtitle}>
            {APP_NAME} · Обновлено {LAST_UPDATED}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: horizontalPadding, paddingBottom: Spacing.xl + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Text style={styles.introText}>
            Мы уважаем вашу приватность. В этом разделе описано, какие данные использует {APP_NAME}, для каких задач и как
            вы можете управлять ими.
          </Text>
        </View>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={24} color={Colors.primary} />
          <View style={styles.contactText}>
            <Text style={styles.contactTitle}>Вопросы по данным</Text>
            <Text style={styles.contactEmail}>{CONTACT_EMAIL}</Text>
          </View>
        </View>

        <View style={{ height: 12 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  introCard: {
    backgroundColor: Colors.primary + '12',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  introText: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    lineHeight: 22,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  sectionBody: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
  },
});
