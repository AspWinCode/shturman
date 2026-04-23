import { createContext, useContext } from 'react';
import type { ThemeColors } from '@/constants/colors';
import { LightColors } from '@/constants/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  colors: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  colors: LightColors,
  mode: 'system',
  isDark: false,
  setMode: async () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
