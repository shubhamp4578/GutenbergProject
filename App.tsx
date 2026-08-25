import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/RootNavigator';
import {colors} from './src/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.secondaryBackground}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
