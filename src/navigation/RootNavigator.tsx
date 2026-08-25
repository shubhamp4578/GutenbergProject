import React, {createContext, useContext, useMemo, useState} from 'react';
import {BooksScreen} from '../screens/BooksScreen';
import {HomeScreen} from '../screens/HomeScreen';
import type {RootStackParamList} from './types';

export type RouteName = keyof RootStackParamList;

export type Route =
  | {name: 'Home'; params: undefined}
  | {name: 'Books'; params: RootStackParamList['Books']};

type Navigation = {
  navigate: {
    (name: 'Home'): void;
    (name: 'Books', params: RootStackParamList['Books']): void;
  };
  goBack: () => void;
  canGoBack: () => boolean;
};

const NavigationContext = createContext<Navigation | null>(null);
const RouteContext = createContext<Route | null>(null);

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

export function RootNavigator() {
  const [stack, setStack] = useState<Route[]>([{name: 'Home', params: undefined}]);
  const current = stack[stack.length - 1];

  const navigation = useMemo<Navigation>(
    () => ({
      navigate: ((name: RouteName, params?: RootStackParamList[RouteName]) => {
        setStack(currentStack => {
          if (name === 'Home') {
            return [{name: 'Home', params: undefined}];
          }
          return [
            ...currentStack,
            {name: 'Books', params: params as RootStackParamList['Books']},
          ];
        });
      }) as Navigation['navigate'],
      goBack: () => {
        setStack(currentStack =>
          currentStack.length > 1 ? currentStack.slice(0, -1) : currentStack,
        );
      },
      canGoBack: () => stack.length > 1,
    }),
    [stack.length],
  );

  return (
    <NavigationContext.Provider value={navigation}>
      <RouteContext.Provider value={current}>
        {current.name === 'Home' ? <HomeScreen /> : <BooksScreen />}
      </RouteContext.Provider>
    </NavigationContext.Provider>
  );
}
