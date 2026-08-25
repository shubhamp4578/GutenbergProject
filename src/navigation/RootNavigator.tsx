import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {BooksScreen} from '../screens/BooksScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {useTheme} from '../theme';
import {
  NavigationContext,
  RouteContext,
  type Navigation,
  type Route,
  type RouteName,
} from './context';
import type {RootStackParamList} from './types';

export function RootNavigator() {
  const {colors} = useTheme();
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
        <View style={{flex: 1, backgroundColor: colors.background}}>
          {current.name === 'Home' ? <HomeScreen /> : <BooksScreen />}
        </View>
      </RouteContext.Provider>
    </NavigationContext.Provider>
  );
}
