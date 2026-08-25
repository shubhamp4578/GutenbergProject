import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../theme';

type BackButtonProps = {
  onPress: () => void;
};

export function BackButton({onPress}: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={onPress}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      style={({pressed}) => [styles.hit, pressed && styles.pressed]}>
      <View style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  pressed: {
    opacity: 0.7,
  },
  chevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.primary,
    transform: [{rotate: '45deg'}],
    marginLeft: 4,
  },
});
