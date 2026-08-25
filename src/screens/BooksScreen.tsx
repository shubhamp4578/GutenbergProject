import {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {Book} from '../api/types';
import {BookCard} from '../components/BookCard';
import {FeedbackState} from '../components/FeedbackState';
import {SearchBox} from '../components/SearchBox';
import {useBooks} from '../hooks/useBooks';
import {t} from '../i18n';
import {useNavigation, useRoute} from '../navigation/RootNavigator';
import {colors, typography} from '../theme';
import {pickViewableBookUrl} from '../utils/bookFormats';

function columnCount(width: number): number {
  if (width >= 1100) {
    return 6;
  }
  if (width >= 900) {
    return 5;
  }
  if (width >= 700) {
    return 4;
  }
  return 3;
}

export function BooksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const [search, setSearch] = useState('');
  const topic = route.name === 'Books' ? route.params.topic : '';
  const genreLabel = route.name === 'Books' ? route.params.genreLabel : '';
  const columns = columnCount(width);

  const {
    books,
    loading,
    refreshing,
    loadingMore,
    error,
    loadMore,
    retry,
    refresh,
  } = useBooks({topic, search});

  const paddedBooks = useMemo(() => {
    const remainder = books.length % columns;
    if (remainder === 0) {
      return books;
    }
    return books.concat(
      Array.from({length: columns - remainder}, (_, index) => ({
        id: -1 - index,
        title: '',
        authors: [],
        formats: {},
        download_count: 0,
      })),
    );
  }, [books, columns]);

  async function openBook(book: Book) {
    if (book.id < 0) {
      return;
    }
    const url = pickViewableBookUrl(book);
    if (!url) {
      Alert.alert(t.noViewableVersion);
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(t.noViewableVersion);
    }
    await Linking.openURL(url);
  }

  return (
    <View style={[styles.screen, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={navigation.goBack}
          hitSlop={12}
          style={styles.back}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.headerTitle}>{genreLabel}</Text>
        </Pressable>
        <SearchBox value={search} onChangeText={setSearch} />
      </View>
      {loading && books.length === 0 ? (
        <FeedbackState loading message={t.loadingBooks} />
      ) : error && books.length === 0 ? (
        <FeedbackState message={t.networkError} onRetry={retry} />
      ) : books.length === 0 ? (
        <FeedbackState message={t.noBooksFound} />
      ) : (
        <FlatList
          data={paddedBooks}
          key={columns}
          numColumns={columns}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) =>
            item.id < 0 ? (
              <View style={[styles.cell, {flex: 1 / columns}]} />
            ) : (
              <View style={[styles.cell, {flex: 1 / columns}]}>
                <BookCard book={item} onPress={openBook} />
              </View>
            )
          }
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: insets.bottom + 24,
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshing={refreshing}
          onRefresh={refresh}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                color={colors.primary}
                style={styles.footerSpinner}
              />
            ) : undefined
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backArrow: {
    ...typography.heading2,
    color: colors.primary,
  },
  headerTitle: {
    ...typography.heading2,
  },
  cell: {
    padding: 6,
  },
  footerSpinner: {
    marginVertical: 16,
  },
});
