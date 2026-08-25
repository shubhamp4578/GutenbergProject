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
      <Text style={styles.arrow}>›</Text>
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
  },
  icon: {
    fontSize: 22,
  },
  label: {
    ...typography.genreCard,
    letterSpacing: 0.5,
  },
  arrow: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '300',
    marginTop: -2,
  },
});
