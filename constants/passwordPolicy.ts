export const PASSWORD_POLICY_HINT = 'Пароль: минимум 8 символов, строчная и заглавная буква, цифра и спецсимвол';

export type PasswordValidationResult = {
  ok: boolean;
  message?: string;
};

export function getPasswordStrengthLevel(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return 1;
  if (score === 2) return 2;
  return 3;
}

export function isStrongPassword(password: string): boolean {
  return getPasswordStrengthLevel(password) === 3;
}

export function validatePasswordByPolicy(password: string): PasswordValidationResult {
  if (password.length < 8) {
    return { ok: false, message: 'Минимум 8 символов' };
  }
  if (!/[A-Z]/.test(password)) {
    return { ok: false, message: 'Добавьте хотя бы одну заглавную букву' };
  }
  if (!/[a-z]/.test(password)) {
    return { ok: false, message: 'Добавьте хотя бы одну строчную букву' };
  }
  if (!/[0-9]/.test(password)) {
    return { ok: false, message: 'Добавьте хотя бы одну цифру' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { ok: false, message: 'Добавьте хотя бы один спецсимвол' };
  }
  return { ok: true };
}
