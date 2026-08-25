export const fonts = {
  regular: 'Montserrat-Regular',
  semiBold: 'Montserrat-SemiBold',
} as const;

export const typography = {
  heading1: {
    fontFamily: fonts.semiBold,
    fontSize: 48,
    color: '#5E56E7',
  },
  heading2: {
    fontFamily: fonts.semiBold,
    fontSize: 30,
    color: '#5E56E7',
  },
  genreCard: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#333333',
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: '#333333',
  },
  searchBox: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: '#333333',
  },
  bookName: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#333333',
  },
  bookAuthor: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: '#A0A0A0',
  },
};
