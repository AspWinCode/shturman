import { en } from '@/locales/en';
import { ru } from '@/locales/ru';

export type LocaleCode = 'ru' | 'en';
interface Dictionary {
  [key: string]: string | Dictionary;
}

const dictionaries: Record<LocaleCode, Dictionary> = {
  ru: ru as unknown as Dictionary,
  en: en as unknown as Dictionary,
};

let currentLocale: LocaleCode = inferInitialLocale();

function inferInitialLocale(): LocaleCode {
  try {
    const navLang =
      typeof navigator !== 'undefined' && typeof navigator.language === 'string'
        ? navigator.language.toLowerCase()
        : '';
    const intlLang = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    const lang = navLang || intlLang;
    return lang.startsWith('ru') ? 'ru' : 'en';
  } catch {
    return 'ru';
  }
}

function readByPath(obj: Dictionary | string, path: string[]): string | null {
  let current: Dictionary | string | undefined = obj;
  for (const key of path) {
    if (!current || typeof current === 'string') return null;
    current = current[key];
  }
  return typeof current === 'string' ? current : null;
}

export function setLocale(next: LocaleCode): void {
  currentLocale = next;
}

export function getLocale(): LocaleCode {
  return currentLocale;
}

export function t(key: string, locale: LocaleCode = currentLocale): string {
  const dict = dictionaries[locale] ?? dictionaries.ru;
  const value = readByPath(dict, key.split('.'));
  if (value) return value;
  const fallback = readByPath(dictionaries.ru, key.split('.'));
  return fallback ?? key;
}
