import {createContext, useContext} from 'react';
import type {RootStackParamList} from './types';

export type RouteName = keyof RootStackParamList;

export type Route =
  | {name: 'Home'; params: undefined}
  | {name: 'Books'; params: RootStackParamList['Books']};

export type Navigation = {
  navigate: {
    (name: 'Home'): void;
    (name: 'Books', params: RootStackParamList['Books']): void;
  };
  goBack: () => void;
  canGoBack: () => boolean;
};

export const NavigationContext = createContext<Navigation | null>(null);
export const RouteContext = createContext<Route | null>(null);

export function useNavigation(): Navigation {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error('useNavigation must be used inside RootNavigator');
  }
  return value;
}

export function useRoute(): Route {
  const value = useContext(RouteContext);
  if (!value) {
    throw new Error('useRoute must be used inside RootNavigator');
  }
  return value;
}
