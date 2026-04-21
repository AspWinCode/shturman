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
import { PasswordStrengthIndicator } from '@/components/ui/PasswordStrengthIndicator';
import { isStrongPassword, PASSWORD_POLICY_HINT } from '@/constants/passwordPolicy';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/theme';
import { useStore } from '@/store/useStore';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const register = useStore((s) => s.register);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Введите имя';
    if (!email) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
    if (!password) newErrors.password = 'Введите пароль';
    else if (!isStrongPassword(password)) {
      newErrors.password = PASSWORD_POLICY_HINT;
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await register(name.trim(), email.trim(), password);

    if (!result.ok) {
      setErrors((prev) => ({
        ...prev,
        email: result.message || 'Не удалось создать аккаунт',
      }));
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(auth)/login');
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
          <Text style={styles.headerEmoji}>🧭</Text>
          <Text style={styles.headerTitle}>Создать аккаунт</Text>
          <Text style={styles.headerSubtitle}>Начните планировать путешествия уже сегодня</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Имя"
          placeholder="Как вас зовут?"
          value={name}
          onChangeText={setName}
          leftIcon="person-outline"
          error={errors.name}
          autoCapitalize="words"
        />
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
          placeholder={PASSWORD_POLICY_HINT.replace('Пароль: ', '')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.password}
        />
        <PasswordStrengthIndicator password={password} />
        <Input
          label="Подтвердите пароль"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          leftIcon="shield-checkmark-outline"
          error={errors.confirmPassword}
        />

        <Text style={styles.terms}>
          Регистрируясь, вы соглашаетесь с{' '}
          <Text style={styles.termsLink}>условиями использования</Text> и{' '}
          <Text style={styles.termsLink}>политикой конфиденциальности</Text>
        </Text>

        <Button
          title="Создать аккаунт"
          onPress={handleRegister}
          size="lg"
          loading={loading}
          style={{ marginTop: Spacing.sm }}
        />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Войти</Text>
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
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  terms: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  loginText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
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
});


