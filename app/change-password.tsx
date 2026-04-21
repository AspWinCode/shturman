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
import { PASSWORD_POLICY_HINT } from '@/constants/passwordPolicy';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const user = useStore((s) => s.user);
  const changePassword = useStore((s) => s.changePassword);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!currentPassword) next.currentPassword = 'Введите текущий пароль';
    if (!newPassword) next.newPassword = 'Введите новый пароль';
    if (newPassword !== confirmPassword) next.confirmPassword = 'Пароли не совпадают';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const result = await changePassword(currentPassword, newPassword);
    if (!result.ok) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: result.message || 'Не удалось изменить пароль',
      }));
      setLoading(false);
      return;
    }
    setLoading(false);
    router.back();
  };

  if (!user.isLoggedIn) {
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" />
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Смена пароля</Text>
        <Text style={styles.subtitle}>Почта: {user.email}</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Input
          label="Текущий пароль"
          placeholder="Введите текущий пароль"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          leftIcon="key-outline"
          error={errors.currentPassword}
        />
        <Input
          label="Новый пароль"
          placeholder={PASSWORD_POLICY_HINT.replace('Пароль: ', '')}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.newPassword}
        />
        <PasswordStrengthIndicator password={newPassword} />
        <Input
          label="Подтвердите пароль"
          placeholder="Повторите новый пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          leftIcon="shield-checkmark-outline"
          error={errors.confirmPassword}
        />

        <Button title="Сохранить пароль" onPress={onSubmit} loading={loading} size="lg" style={{ marginTop: Spacing.sm }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
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
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
});

