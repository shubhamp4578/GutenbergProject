export const en = {
  appName: 'Gutenberg Project',
  appDescription:
    'A social cataloging website that allows you to freely search its database of books, annotations, and reviews.',
  searchPlaceholder: 'Search',
  noViewableVersion: 'No viewable version available',
  retry: 'Retry',
  loadingBooks: 'Loading books…',
  noBooksFound: 'No books found.',
  networkError: 'Unable to load books. Check your connection and try again.',
  ok: 'OK',
  genres: {
    fiction: 'Fiction',
    drama: 'Drama',
    humor: 'Humor',
    politics: 'Politics',
    philosophy: 'Philosophy',
    history: 'History',
    adventure: 'Adventure',
  },
} as const;

export type AppStrings = typeof en;
