import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GenreCard} from '../components/GenreCard';
import {genres} from '../constants/genres';
import {t} from '../i18n';
import {useNavigation} from '../navigation/context';
import {useTheme} from '../theme';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {colors, typography} = useTheme();
  const isWide = width >= 700;
  const titleSize = width < 380 ? 28 : width < 420 ? 32 : 36;

  return (
    <ScrollView
      style={[styles.screen, {backgroundColor: colors.background}]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 32,
          flexGrow: 1,
        },
      ]}>
      <Text
        style={[
          styles.title,
          typography.heading1,
          {fontSize: titleSize, lineHeight: titleSize + 6},
        ]}>
        {t.appName}
      </Text>
      <Text style={[styles.subtitle, typography.body, {color: colors.textMuted}]}>
        {t.appDescription}
      </Text>
      <View style={[styles.list, isWide && styles.listWide]}>
        {genres.map(genre => (
          <View
            key={genre.id}
            style={[styles.cardWrap, isWide && styles.cardWrapWide]}>
            <GenreCard
              icon={genre.icon}
              label={genre.label}
              onPress={() =>
                navigation.navigate('Books', {
                  genreId: genre.id,
                  genreLabel: genre.label,
                  topic: genre.topic,
                })
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 24,
  },
  list: {
    gap: 14,
  },
  listWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrap: {
    width: '100%',
  },
  cardWrapWide: {
    width: '48.5%',
  },
});
