import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '../theme';

type BackButtonProps = {
  onPress: () => void;
};

export function BackButton({onPress}: BackButtonProps) {
  const {colors} = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      style={({pressed}) => [
        styles.hit,
        {
          backgroundColor: colors.primarySoft,
          opacity: pressed ? 0.75 : 1,
        },
      ]}>
      <View style={[styles.chevron, {borderColor: colors.primary}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  chevron: {
    width: 11,
    height: 11,
    borderLeftWidth: 2.4,
    borderBottomWidth: 2.4,
    transform: [{rotate: '45deg'}],
    marginLeft: 3,
  },
});
