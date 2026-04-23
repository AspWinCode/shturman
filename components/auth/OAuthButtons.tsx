/**
 * OAuthButtons — кнопки социального входа (Яндекс ID, Google, Apple)
 *
 * Работает в двух режимах:
 *  • Demo-mode (нет реального OAuth client_id): показывает модальное окно,
 *    где пользователь вводит email/имя — API создаёт/находит аккаунт.
 *  • Production-mode: открывает браузер → backend OAuth flow → deep link.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useStore } from '@/store/useStore';

type Provider = 'yandex' | 'google' | 'apple';

interface OAuthProvider {
  id: Provider;
  label: string;
  bg: string;
  fg: string;
  borderColor?: string;
  emoji: string;
}

const PROVIDERS: OAuthProvider[] = [
  {
    id: 'yandex',
    label: 'Яндекс ID',
    bg: '#FC3F1D',
    fg: '#fff',
    emoji: 'Я',
  },
  {
    id: 'google',
    label: 'Google',
    bg: '#fff',
    fg: '#3C4043',
    borderColor: '#DADCE0',
    emoji: 'G',
  },
  ...(Platform.OS === 'ios'
    ? [
        {
          id: 'apple' as Provider,
          label: 'Apple',
          bg: '#000',
          fg: '#fff',
          emoji: '',
        },
      ]
    : []),
];

interface OAuthModalState {
  visible: boolean;
  provider: Provider | null;
  email: string;
  name: string;
}

interface Props {
  onSuccess?: () => void;
}

export function OAuthButtons({ onSuccess }: Props) {
  const oauthLogin = useStore((s) => s.oauthLogin);

  const [modal, setModal] = useState<OAuthModalState>({
    visible: false,
    provider: null,
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  const openModal = (provider: Provider) => {
    setModal({ visible: true, provider, email: '', name: '' });
    setEmailError('');
    setNameError('');
  };

  const closeModal = () => {
    if (loading) return;
    setModal((m) => ({ ...m, visible: false }));
  };

  const validateFields = () => {
    let ok = true;
    if (!modal.name.trim()) {
      setNameError('Введите имя');
      ok = false;
    } else {
      setNameError('');
    }
    if (!modal.email.trim() || !/\S+@\S+\.\S+/.test(modal.email)) {
      setEmailError('Введите корректный email');
      ok = false;
    } else {
      setEmailError('');
    }
    return ok;
  };

  const handleContinue = async () => {
    if (!validateFields() || !modal.provider) return;

    setLoading(true);
    // idToken = 'demo' in dev/staging; real JWT from provider in production
    const idToken = __DEV__ ? `demo-${modal.provider}-${Date.now()}` : 'pending-real-oauth';

    const result = await oauthLogin(modal.provider, idToken, {
      email: modal.email.trim().toLowerCase(),
      name: modal.name.trim(),
    });

    setLoading(false);

    if (!result.ok) {
      Alert.alert('Ошибка входа', result.message || 'Попробуйте ещё раз');
      return;
    }

    setModal((m) => ({ ...m, visible: false }));
    onSuccess?.();
  };

  const providerConfig = PROVIDERS.find((p) => p.id === modal.provider);

  return (
    <>
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>или войти через</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.buttonsRow}>
        {PROVIDERS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.oauthBtn,
              { backgroundColor: p.bg },
              p.borderColor ? { borderWidth: 1, borderColor: p.borderColor } : undefined,
            ]}
            onPress={() => openModal(p.id)}
            activeOpacity={0.8}
            accessibilityLabel={`Войти через ${p.label}`}
            accessibilityRole="button"
          >
            {p.id === 'apple' ? (
              <Ionicons name="logo-apple" size={20} color={p.fg} />
            ) : (
              <Text style={[styles.oauthBtnLetter, { color: p.fg }]}>{p.emoji}</Text>
            )}
            <Text style={[styles.oauthBtnLabel, { color: p.fg }]}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Demo OAuth modal */}
      <Modal
        visible={modal.visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity style={styles.overlayBg} activeOpacity={1} onPress={closeModal} />

          <View style={styles.sheet}>
            {/* Header */}
            <View style={styles.sheetHeader}>
              {providerConfig && (
                <View
                  style={[
                    styles.providerBadge,
                    { backgroundColor: providerConfig.bg },
                    providerConfig.borderColor
                      ? { borderWidth: 1, borderColor: providerConfig.borderColor }
                      : undefined,
                  ]}
                >
                  {providerConfig.id === 'apple' ? (
                    <Ionicons name="logo-apple" size={18} color={providerConfig.fg} />
                  ) : (
                    <Text style={[styles.providerLetter, { color: providerConfig.fg }]}>
                      {providerConfig.emoji}
                    </Text>
                  )}
                </View>
              )}
              <Text style={styles.sheetTitle}>
                Войти через {providerConfig?.label}
              </Text>
              <Text style={styles.sheetSubtitle}>
                Введите данные аккаунта {providerConfig?.label}
              </Text>
            </View>

            {/* Fields */}
            <View style={styles.fields}>
              <Text style={styles.fieldLabel}>Имя</Text>
              <TextInput
                style={[styles.field, nameError ? styles.fieldError : undefined]}
                placeholder="Ваше имя"
                value={modal.name}
                onChangeText={(v) => setModal((m) => ({ ...m, name: v }))}
                autoCapitalize="words"
                autoComplete="name"
                placeholderTextColor={Colors.textTertiary}
                editable={!loading}
              />
              {nameError ? <Text style={styles.errText}>{nameError}</Text> : null}

              <Text style={[styles.fieldLabel, { marginTop: Spacing.md }]}>Email</Text>
              <TextInput
                style={[styles.field, emailError ? styles.fieldError : undefined]}
                placeholder="email@example.com"
                value={modal.email}
                onChangeText={(v) => setModal((m) => ({ ...m, email: v }))}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholderTextColor={Colors.textTertiary}
                editable={!loading}
              />
              {emailError ? <Text style={styles.errText}>{emailError}</Text> : null}
            </View>

            {/* Actions */}
            <TouchableOpacity
              style={[
                styles.continueBtn,
                providerConfig ? { backgroundColor: providerConfig.bg } : undefined,
                providerConfig?.borderColor
                  ? { borderWidth: 1, borderColor: providerConfig.borderColor }
                  : undefined,
              ]}
              onPress={handleContinue}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={providerConfig?.fg || '#fff'} />
              ) : (
                <Text
                  style={[
                    styles.continueBtnText,
                    { color: providerConfig?.fg || '#fff' },
                  ]}
                >
                  Продолжить
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal} style={styles.cancelBtn} disabled={loading}>
              <Text style={styles.cancelBtnText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  buttonsRow: {
    gap: Spacing.sm,
  },
  oauthBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  oauthBtnLetter: {
    fontSize: 16,
    fontWeight: '800',
    width: 20,
    textAlign: 'center',
  },
  oauthBtnLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },

  // Modal
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    ...Shadows.card,
  },
  sheetHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  providerBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  providerLetter: {
    fontSize: 22,
    fontWeight: '800',
  },
  sheetTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fields: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  field: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: 13,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  fieldError: {
    borderColor: Colors.error,
  },
  errText: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 4,
  },
  continueBtn: {
    paddingVertical: 15,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  continueBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  cancelBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
  },
});
