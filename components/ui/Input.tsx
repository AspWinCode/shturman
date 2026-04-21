import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  editable?: boolean;
  onPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  leftIcon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
  style,
  editable = true,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const container = onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error ? styles.errorBorder : null,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? Colors.primary : Colors.textTertiary}
            style={styles.leftIcon}
          />
        )}
        <Text style={[styles.input, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error ? styles.errorBorder : null,
        !editable && styles.disabled,
      ]}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={20}
          color={isFocused ? Colors.primary : Colors.textTertiary}
          style={styles.leftIcon}
        />
      )}
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        editable={editable}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.rightIcon}
        >
          <Ionicons
            name={isSecure ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={Colors.textTertiary}
          />
        </TouchableOpacity>
      )}
      {rightIcon && !secureTextEntry && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Ionicons name={rightIcon} size={20} color={Colors.textTertiary} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {container}
      {error && <Text style={styles.error}>{error}</Text>}
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
  focused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    padding: 4,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  multiline: {
    paddingVertical: Spacing.md,
    textAlignVertical: 'top',
  },
  placeholder: {
    color: Colors.textTertiary,
  },
  error: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 4,
  },
});
