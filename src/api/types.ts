export type Person = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export type Book = {
  id: number;
  title: string;
  authors: Person[];
  formats: Record<string, string>;
  download_count: number;
};

export type BooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};
