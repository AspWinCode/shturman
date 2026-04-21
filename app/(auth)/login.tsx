import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/theme';
import { useStore } from '@/store/useStore';

const DEMO_EMAIL = 'demo@travelai.app';
const DEMO_PASSWORD = 'Travel123!';
const SHOW_DEMO_CREDENTIALS = __DEV__ || process.env.EXPO_PUBLIC_SHOW_DEMO_CREDENTIALS === 'true';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const login = useStore((s) => s.login);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
    if (!password) newErrors.password = 'Введите пароль';
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = await login(email, password);
    if (!result.ok) {
      setErrors({
        email: result.message || 'Неверный логин или пароль',
        password: 'Проверьте логин и пароль',
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <View style={[styles.gradientHeader, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>✈️</Text>
          <Text style={styles.headerTitle}>Добро пожаловать</Text>
          <Text style={styles.headerSubtitle}>Войдите в аккаунт или используйте демо-доступ</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {SHOW_DEMO_CREDENTIALS ? (
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Демо-доступ</Text>
            <Text style={styles.demoText}>Логин: {DEMO_EMAIL}</Text>
            <Text style={styles.demoText}>Пароль: {DEMO_PASSWORD}</Text>
          </View>
        ) : null}

        <Input
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
          error={errors.email}
        />
        <Input
          label="Пароль"
          placeholder="Введите пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.password}
        />
        <TouchableOpacity onPress={() => router.push({ pathname: '/(auth)/recover' } as never)}>
          <Text style={styles.recoverLink}>Забыли пароль?</Text>
        </TouchableOpacity>

        <Button
          title="Войти"
          onPress={handleLogin}
          size="lg"
          loading={loading}
          style={{ marginTop: Spacing.sm }}
        />

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Нет аккаунта? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.registerLink}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradientHeader: {
    paddingTop: 56,
    paddingBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['2xl'],
    borderBottomRightRadius: BorderRadius['2xl'],
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  demoBox: {
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  demoTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: 6,
  },
  demoText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  recoverLink: {
    marginTop: 6,
    marginBottom: 2,
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    textAlign: 'right',
    fontWeight: Typography.weights.medium,
  },
  registerText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
});
