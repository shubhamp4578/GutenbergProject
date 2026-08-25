import type {Book} from '../api/types';

const ZIP_PATTERN = /\.zip($|\?)/i;

function isZipUrl(url: string): boolean {
  return ZIP_PATTERN.test(url);
}

function findFormat(
  formats: Record<string, string>,
  matcher: (mime: string) => boolean,
): string | undefined {
  for (const [mime, url] of Object.entries(formats)) {
    if (matcher(mime) && url && !isZipUrl(url)) {
      return url;
    }
  }
  return undefined;
}

export function pickViewableBookUrl(book: Book): string | null {
  return (
    findFormat(book.formats, mime => mime.startsWith('text/html')) ??
    findFormat(
      book.formats,
      mime => mime === 'application/pdf' || mime.includes('pdf'),
    ) ??
    findFormat(book.formats, mime => mime.startsWith('text/plain')) ??
    null
  );
}

export function getBookCoverUrl(book: Book): string | undefined {
  return (
    book.formats['image/jpeg'] ??
    findFormat(book.formats, mime => mime.startsWith('image/'))
  );
}

export function getAuthorName(book: Book): string {
  return book.authors[0]?.name ?? '';
}
