import type {GenreId} from '../navigation/types';
import {t} from '../i18n';

export type Genre = {
  id: GenreId;
  topic: string;
  label: string;
  icon: string;
};

export const genres: Genre[] = [
  {id: 'fiction', topic: 'fiction', label: t.genres.fiction, icon: '🧪'},
  {id: 'drama', topic: 'drama', label: t.genres.drama, icon: '🎭'},
  {id: 'humor', topic: 'humor', label: t.genres.humor, icon: '😄'},
  {id: 'politics', topic: 'politics', label: t.genres.politics, icon: '🏛️'},
  {id: 'philosophy', topic: 'philosophy', label: t.genres.philosophy, icon: '☯️'},
  {id: 'history', topic: 'history', label: t.genres.history, icon: '📜'},
  {id: 'adventure', topic: 'adventure', label: t.genres.adventure, icon: '🧭'},
];
