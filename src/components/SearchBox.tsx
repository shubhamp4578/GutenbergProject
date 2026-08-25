import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {t} from '../i18n';
import {colors, typography} from '../theme';

type SearchBoxProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBox({value, onChangeText}: SearchBoxProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.row, focused && styles.focused]}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t.searchPlaceholder}
        placeholderTextColor={colors.grey}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel={t.searchPlaceholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          hitSlop={8}>
          <Text style={styles.clear}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.greyLight,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  icon: {
    fontSize: 18,
    color: colors.grey,
    marginRight: 8,
  },
  input: {
    ...typography.searchBox,
    flex: 1,
    padding: 0,
    color: colors.greyDark,
  },
  clear: {
    fontSize: 22,
    color: colors.grey,
    paddingHorizontal: 4,
  },
});
