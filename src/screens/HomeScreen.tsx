import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GenreCard} from '../components/GenreCard';
import {genres} from '../constants/genres';
import {t} from '../i18n';
import {useNavigation} from '../navigation/context';
import {colors, typography} from '../theme';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const isWide = width >= 700;
  const titleSize = width < 360 ? 36 : 48;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          flexGrow: 1,
        },
      ]}>
      <Text style={[styles.title, {fontSize: titleSize, lineHeight: titleSize + 4}]}>
        {t.appName}
      </Text>
      <Text style={styles.subtitle}>{t.appDescription}</Text>
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
    backgroundColor: colors.secondaryBackground,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    ...typography.heading1,
    lineHeight: 52,
  },
  subtitle: {
    ...typography.body,
    color: colors.greyDark,
    marginTop: 12,
    marginBottom: 28,
    lineHeight: 24,
  },
  list: {
    gap: 12,
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
