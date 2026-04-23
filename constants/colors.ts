import { Appearance, ColorSchemeName } from 'react-native';

export const LightColors = {
  primary: '#1C4FA3',
  primaryDark: '#123B7F',
  primaryLight: '#3C78D8',
  secondary: '#0EA5E9',
  accent: '#FF7A3D',
  success: '#15803D',
  warning: '#B45309',
  error: '#C73737',

  background: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF2FA',
  card: '#FFFFFF',

  text: '#0C1A2B',
  textSecondary: '#40536F',
  textTertiary: '#8B9CB2',
  textInverse: '#FFFFFF',

  border: '#CFD9EA',
  borderLight: '#E7EDF7',
  divider: '#CFD9EA',

  tabBar: {
    active: '#1B3A6B',
    inactive: '#8896AA',
    background: '#FFFFFF',
    border: '#D0D8E8',
  },

  gradient: {
    primary: ['#3E87EB', '#1C4FA3', '#123B7F'] as [string, string, string],
    dark: ['#1A2E4F', '#1C4A7A', '#245B96'] as [string, string, string],
  },
};

export const DarkColors: typeof LightColors = {
  primary: '#83B5FF',
  primaryDark: '#5A95E8',
  primaryLight: '#A8CCFF',
  secondary: '#7AD2FF',
  accent: '#FF9B6A',
  success: '#71CF96',
  warning: '#E9BE79',
  error: '#F08686',

  background: '#0D1422',
  surface: '#15233A',
  surfaceAlt: '#1D2E4A',
  card: '#15233A',

  text: '#E9F1FD',
  textSecondary: '#BFD0EB',
  textTertiary: '#92A8C9',
  textInverse: '#0E1420',

  border: '#2C3E5D',
  borderLight: '#365177',
  divider: '#2C3E5D',

  tabBar: {
    active: '#A6C6EE',
    inactive: '#8EA1C2',
    background: '#101A2A',
    border: '#2A3A55',
  },

  gradient: {
    primary: ['#25497D', '#1A3358', '#122644'],
    dark: ['#1A2640', '#223352', '#2D4368'],
  },
};

export type ThemeColors = typeof LightColors;

let forcedMode: 'light' | 'dark' | null = null;

export function setForcedThemeMode(mode: 'light' | 'dark' | 'system') {
  forcedMode = mode === 'system' ? null : mode;
}

export function getThemeColors(scheme?: ColorSchemeName): ThemeColors {
  const resolvedScheme = forcedMode ?? (scheme === 'dark' ? 'dark' : 'light');
  return resolvedScheme === 'dark' ? DarkColors : LightColors;
}

const Colors: ThemeColors = new Proxy({} as ThemeColors, {
  get(_target, prop) {
    const theme = getThemeColors(Appearance.getColorScheme());
    return theme[prop as keyof ThemeColors];
  },
});

export default Colors;
