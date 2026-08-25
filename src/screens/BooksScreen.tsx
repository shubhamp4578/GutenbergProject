import {StyleSheet, View} from 'react-native';
import {colors} from '../theme';

export function BooksScreen() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
