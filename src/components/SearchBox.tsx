import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {t} from '../i18n';
import {useTheme} from '../theme';

type SearchBoxProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBox({value, onChangeText}: SearchBoxProps) {
  const [focused, setFocused] = useState(false);
  const {colors, typography} = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: focused ? colors.searchFocused : colors.searchBackground,
          borderColor: focused ? colors.primary : colors.border,
        },
      ]}>
      <Text style={[styles.icon, {color: colors.textMuted}]}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t.searchPlaceholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, typography.searchBox, {color: colors.text}]}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        disableFullscreenUI={true}
        underlineColorAndroid="transparent"
        accessibilityLabel={t.searchPlaceholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          hitSlop={8}
          style={styles.clearHit}>
          <Text style={[styles.clear, {color: colors.textMuted}]}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    includeFontPadding: false,
  },
  clearHit: {
    minWidth: 28,
    alignItems: 'center',
  },
  clear: {
    fontSize: 22,
    lineHeight: 24,
  },
});
