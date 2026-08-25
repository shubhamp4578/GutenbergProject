import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, typography} from '../theme';

type GenreCardProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export function GenreCard({icon, label, onPress}: GenreCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.left}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
      </View>
      <View style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 50,
    borderRadius: 4,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#D3D1EE',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  icon: {
    fontSize: 22,
  },
  label: {
    ...typography.genreCard,
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  chevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2.5,
    borderTopWidth: 2.5,
    borderColor: colors.primary,
    transform: [{rotate: '45deg'}],
    marginRight: 4,
  },
});
