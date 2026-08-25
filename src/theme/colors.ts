export type ThemeColors = {
  primary: string;
  primarySoft: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  searchBackground: string;
  searchFocused: string;
  shadow: string;
  overlay: string;
  white: string;
};

export const lightColors: ThemeColors = {
  primary: '#5E56E7',
  primarySoft: 'rgba(94, 86, 231, 0.12)',
  background: '#F8F7FF',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: 'rgba(94, 86, 231, 0.08)',
  text: '#1F1F2E',
  textSecondary: '#333333',
  textMuted: '#8B8B9E',
  searchBackground: '#F0F0F6',
  searchFocused: '#FFFFFF',
  shadow: 'rgba(94, 86, 231, 0.18)',
  overlay: 'rgba(31, 31, 46, 0.04)',
  white: '#FFFFFF',
};

export const darkColors: ThemeColors = {
  primary: '#8B85F0',
  primarySoft: 'rgba(139, 133, 240, 0.18)',
  background: '#12121A',
  surface: '#1C1C28',
  surfaceElevated: '#242433',
  border: 'rgba(139, 133, 240, 0.16)',
  text: '#F4F3FF',
  textSecondary: '#D6D5E5',
  textMuted: '#9A99B0',
  searchBackground: '#242433',
  searchFocused: '#2E2E40',
  shadow: 'rgba(0, 0, 0, 0.45)',
  overlay: 'rgba(255, 255, 255, 0.04)',
  white: '#FFFFFF',
};

/** @deprecated Prefer useTheme().colors */
export const colors = lightColors;
