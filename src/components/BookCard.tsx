import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import type {Book} from '../api/types';
import {useTheme} from '../theme';
import {getAuthorName, getBookCoverUrl} from '../utils/bookFormats';

type BookCardProps = {
  book: Book;
  onPress: (book: Book) => void;
};

export function BookCard({book, onPress}: BookCardProps) {
  const {colors, typography} = useTheme();
  const cover = getBookCoverUrl(book);
  const author = getAuthorName(book);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={book.title}
      onPress={() => onPress(book)}
      style={({pressed}) => [
        styles.wrap,
        pressed && styles.pressed,
        {transform: [{scale: pressed ? 0.98 : 1}]},
      ]}>
      <View
        style={[
          styles.coverShell,
          {
            backgroundColor: colors.surfaceElevated,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}>
        {cover ? (
          <Image source={{uri: cover}} style={styles.cover} />
        ) : (
          <View
            style={[styles.cover, styles.placeholder, {backgroundColor: colors.searchBackground}]}
          />
        )}
      </View>
      <Text
        style={[typography.bookName, styles.title, {color: colors.text}]}
        numberOfLines={2}>
        {book.title}
      </Text>
      {author ? (
        <Text
          style={[typography.bookAuthor, styles.author, {color: colors.textMuted}]}
          numberOfLines={1}>
          {author}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  pressed: {
    opacity: 0.9,
  },
  coverShell: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 5,
  },
  cover: {
    width: '100%',
    aspectRatio: 114 / 162,
  },
  placeholder: {},
  title: {
    marginTop: 10,
    lineHeight: 16,
  },
  author: {
    marginTop: 3,
  },
});
