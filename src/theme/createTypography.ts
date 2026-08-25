import {fonts} from './typography';
import type {ThemeColors} from './colors';

export function createTypography(colors: ThemeColors) {
  return {
    heading1: {
      fontFamily: fonts.semiBold,
      fontSize: 40,
      color: colors.primary,
    },
    heading2: {
      fontFamily: fonts.semiBold,
      fontSize: 28,
      color: colors.primary,
    },
    genreCard: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
    },
    body: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.textSecondary,
    },
    searchBox: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.text,
    },
    bookName: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      color: colors.text,
    },
    bookAuthor: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.textMuted,
    },
  } as const;
}

export type AppTypography = ReturnType<typeof createTypography>;
