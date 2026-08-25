import {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {Book} from '../api/types';
import {BackButton} from '../components/BackButton';
import {BookCard} from '../components/BookCard';
import {FeedbackState} from '../components/FeedbackState';
import {SearchBox} from '../components/SearchBox';
import {useBooks} from '../hooks/useBooks';
import {t} from '../i18n';
import {useNavigation, useRoute} from '../navigation/context';
import {useTheme} from '../theme';
import {pickViewableBookUrl} from '../utils/bookFormats';

function columnCount(width: number, height: number): number {
  const landscape = width > height;
  if (width >= 1100) {
    return 6;
  }
  if (width >= 900) {
    return 5;
  }
  if (width >= 700 || landscape) {
    return 4;
  }
  return 3;
}

export function BooksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const {colors, typography} = useTheme();
  const [search, setSearch] = useState('');
  const topic = route.name === 'Books' ? route.params.topic : '';
  const genreLabel = route.name === 'Books' ? route.params.genreLabel : '';
  const columns = columnCount(width, height);
  const landscape = width > height;

  const {
    books,
    loading,
    refreshing,
    loadingMore,
    error,
    nextUrl,
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
  }

  return (
    <KeyboardAvoidingView
      style={[styles.screen, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top + (landscape ? 4 : 12),
            paddingBottom: landscape ? 8 : 12,
            paddingHorizontal: landscape ? 20 : 16,
            gap: landscape ? 8 : 12,
          },
        ]}>
        <View style={styles.titleRow}>
          <BackButton onPress={navigation.goBack} />
          <Text
            style={[
              typography.heading2,
              styles.headerTitle,
              landscape && styles.headerTitleLandscape,
            ]}
            numberOfLines={1}>
            {genreLabel}
          </Text>
        </View>
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
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
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
            paddingHorizontal: landscape ? 18 : 12,
            paddingBottom: insets.bottom + 24,
            paddingTop: 4,
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshing={refreshing}
          onRefresh={refresh}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footerBlock}>
                <ActivityIndicator
                  color={colors.primary}
                  style={styles.footerSpinner}
                />
                {__DEV__ ? (
                  <Text style={[styles.footerDebug, {color: colors.textMuted}]}>
                    Loading more…
                    {nextUrl ? `\n${nextUrl}` : ''}
                  </Text>
                ) : null}
              </View>
            ) : error && books.length > 0 ? (
              <FeedbackState message={t.networkError} onRetry={retry} />
            ) : undefined
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 40,
  },
  headerTitle: {
    flexShrink: 1,
    includeFontPadding: false,
  },
  headerTitleLandscape: {
    fontSize: 24,
  },
  cell: {
    padding: 8,
  },
  footerBlock: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  footerSpinner: {
    marginVertical: 4,
  },
  footerDebug: {
    fontSize: 11,
    textAlign: 'center',
  },
});
