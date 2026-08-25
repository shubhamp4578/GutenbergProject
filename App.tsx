import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation/RootNavigator';
import {colors} from './src/theme';

function App() {
  return (
    <SafeAreaProvider style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
});

export default App;
