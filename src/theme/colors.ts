export const colors = {
  primary: '#5E56E7',
  secondaryBackground: '#F8F7FF',
  greyLight: '#F0F0F6',
  grey: '#A0A0A0',
  greyDark: '#333333',
  white: '#FFFFFF',
  shadow: 'rgba(211, 209, 238, 0.5)',
} as const;

export type ColorName = keyof typeof colors;
