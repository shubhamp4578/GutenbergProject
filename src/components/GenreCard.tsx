import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../theme';

type GenreCardProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export function GenreCard({icon, label, onPress}: GenreCardProps) {
  const {colors, typography} = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          transform: [{scale: pressed ? 0.985 : 1}],
        },
        pressed && {opacity: 0.92},
      ]}>
      <View style={styles.left}>
        <View style={[styles.iconWrap, {backgroundColor: colors.primarySoft}]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={[typography.genreCard, styles.label]}>{label}</Text>
      </View>
      <View style={[styles.chevronWrap, {backgroundColor: colors.primarySoft}]}>
        <View style={[styles.chevron, {borderColor: colors.primary}]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexShrink: 1,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  label: {
    letterSpacing: 0.2,
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 9,
    height: 9,
    borderRightWidth: 2.2,
    borderTopWidth: 2.2,
    transform: [{rotate: '45deg'}],
    marginLeft: -2,
  },
});
