import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import type {Book} from '../api/types';
import {colors, typography} from '../theme';
import {getAuthorName, getBookCoverUrl} from '../utils/bookFormats';

type BookCardProps = {
  book: Book;
  onPress: (book: Book) => void;
};

export function BookCard({book, onPress}: BookCardProps) {
  const cover = getBookCoverUrl(book);
  const author = getAuthorName(book);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={book.title}
      onPress={() => onPress(book)}
      style={({pressed}) => [styles.wrap, pressed && styles.pressed]}>
      {cover ? (
        <Image source={{uri: cover}} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.placeholder]} />
      )}
      <Text style={styles.title} numberOfLines={2}>
        {book.title.toUpperCase()}
      </Text>
      {author ? (
        <Text style={styles.author} numberOfLines={1}>
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
    opacity: 0.85,
  },
  cover: {
    width: '100%',
    aspectRatio: 114 / 162,
    borderRadius: 8,
    backgroundColor: colors.greyLight,
    shadowColor: '#D3D1EE',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  placeholder: {
    backgroundColor: colors.greyLight,
  },
  title: {
    ...typography.bookName,
    marginTop: 8,
  },
  author: {
    ...typography.bookAuthor,
    marginTop: 2,
  },
});
