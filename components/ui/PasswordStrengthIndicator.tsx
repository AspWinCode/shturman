import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';
import { Typography } from '@/constants/theme';
import { getPasswordStrengthLevel } from '@/constants/passwordPolicy';

export type PasswordStrength = {
  level: 0 | 1 | 2 | 3;
  label: string;
  color: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  const level = getPasswordStrengthLevel(password);
  if (level === 0) return { level: 0, label: 'Не задано', color: Colors.textTertiary };
  if (level === 1) return { level: 1, label: 'Слабый', color: Colors.error };
  if (level === 2) return { level: 2, label: 'Средний', color: Colors.warning };
  return { level: 3, label: 'Сильный', color: Colors.success };
}

interface Props {
  password: string;
}

export function PasswordStrengthIndicator({ password }: Props) {
  const strength = getPasswordStrength(password);

  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {[1, 2, 3].map((idx) => (
          <View
            key={idx}
            style={[
              styles.bar,
              idx <= strength.level && { backgroundColor: strength.color },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.text, { color: strength.color }]}>
        Надежность пароля: {strength.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 6,
    marginBottom: 10,
  },
  bars: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.border,
  },
  text: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
  },
});


