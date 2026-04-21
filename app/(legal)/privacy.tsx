import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

const LAST_UPDATED = '20 апреля 2025 г.';
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
      'Мы собираем следующие данные при использовании приложения:\n\n' +
      '• Имя и адрес электронной почты (при регистрации)\n' +
      '• Предпочтения путешествий: интересы, стиль поездки, тип путешественника\n' +
      '• Данные о созданных маршрутах: города, даты, бюджет\n' +
      '• Техническая информация: версия ОС, тип устройства (для улучшения работы приложения)\n\n' +
      'Мы НЕ собираем: платёжные данные, геолокацию без явного разрешения, контакты устройства.',
  },
  {
    title: '2. Как мы используем данные',
    body:
      'Собранные данные используются исключительно для:\n\n' +
      '• Генерации персонализированных маршрутов путешествий\n' +
      '• Хранения ваших поездок и предпочтений между сессиями\n' +
      '• Улучшения качества рекомендаций\n' +
      '• Технической поддержки при обращении\n\n' +
      'Мы не продаём ваши данные третьим лицам и не используем их для рекламных целей.',
  },
  {
    title: '3. Передача данных третьим сторонам',
    body:
      'При использовании функций поиска билетов приложение взаимодействует со следующими сервисами:\n\n' +
      '• Aviasales / Travelpayouts — поиск авиабилетов. Политика: travelpayouts.com/privacy\n' +
      '• Tutu.ru — расписание поездов и автобусов. Политика: tutu.ru/info/privacy\n' +
      '• Яндекс Путешествия — авиа, поезда, отели. Политика: yandex.ru/legal/confidential\n\n' +
      'При переходе по ссылкам на эти сервисы на вас распространяются их политики конфиденциальности. ' +
      'Мы передаём только параметры поиска (города, даты) — без ваших личных данных.',
  },
  {
    title: '4. Хранение данных',
    body:
      'Ваши данные хранятся:\n\n' +
      '• На устройстве — в локальной базе данных SQLite (маршруты, сессия)\n' +
      '• На нашем сервере — зашифрованные данные аккаунта (email, хэш пароля)\n\n' +
      'Пароль хранится исключительно в виде хэша (bcrypt) и никогда не передаётся в открытом виде. ' +
      'Сессионные токены автоматически обновляются и имеют срок действия 30 дней.',
  },
  {
    title: '5. Права пользователя',
    body:
      'Вы имеете право:\n\n' +
      '• Запросить удаление всех ваших данных — напишите на ' + CONTACT_EMAIL + '\n' +
      '• Получить копию ваших данных по запросу\n' +
      '• Изменить или удалить аккаунт в разделе «Профиль» приложения\n' +
      '• Отказаться от сбора аналитических данных\n\n' +
      'Запросы обрабатываются в течение 10 рабочих дней.',
  },
  {
    title: '6. Безопасность',
    body:
      'Для защиты данных используются:\n\n' +
      '• HTTPS/TLS для всех сетевых запросов\n' +
      '• JWT-токены с ограниченным сроком действия\n' +
      '• Хэширование паролей (bcrypt)\n' +
      '• Минимизация передаваемых данных\n\n' +
      'В случае утечки данных мы уведомим пользователей в течение 72 часов.',
  },
  {
    title: '7. Дети',
    body:
      'Приложение не предназначено для детей младше 6 лет. ' +
      'Мы не собираем намеренно данные пользователей до 14 лет без согласия родителей. ' +
      'Если вам стало известно о предоставлении данных ребёнком, свяжитесь с нами: ' + CONTACT_EMAIL,
  },
  {
    title: '8. Изменения политики',
    body:
      'Мы можем обновлять данную политику. ' +
      'При существенных изменениях мы уведомим вас через приложение или по email. ' +
      'Дата последнего обновления указана в начале документа. ' +
      'Продолжение использования приложения после изменений означает согласие с новой редакцией.',
  },
  {
    title: '9. Контакты',
    body:
      'По вопросам конфиденциальности:\n\n' +
      '• Email: ' + CONTACT_EMAIL + '\n' +
      '• Ответ в течение 3 рабочих дней\n\n' +
      'Разработчик: ИП / ООО «Штурман»\n' +
      'Россия',
  },
];

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Политика конфиденциальности</Text>
          <Text style={styles.headerSubtitle}>{APP_NAME} · Обновлено {LAST_UPDATED}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introText}>
            Мы уважаем вашу конфиденциальность. В этом документе описано, какие данные собирает
            приложение «{APP_NAME}», как они используются и как вы можете управлять ими.
          </Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        {/* Contact CTA */}
        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={24} color={Colors.primary} />
          <View style={styles.contactText}>
            <Text style={styles.contactTitle}>Есть вопросы?</Text>
            <Text style={styles.contactEmail}>{CONTACT_EMAIL}</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
