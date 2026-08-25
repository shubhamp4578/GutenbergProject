export type GenreId =
  | 'fiction'
  | 'drama'
  | 'humor'
  | 'politics'
  | 'philosophy'
  | 'history'
  | 'adventure';

export type RootStackParamList = {
  Home: undefined;
  Books: {
    genreId: GenreId;
    genreLabel: string;
    topic: string;
  };
};
