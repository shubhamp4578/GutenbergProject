import {pickViewableBookUrl} from '../src/utils/bookFormats';
import type {Book} from '../src/api/types';

function book(formats: Record<string, string>): Book {
  return {
    id: 1,
    title: 'Test',
    authors: [],
    formats,
    download_count: 0,
  };
}

describe('pickViewableBookUrl', () => {
  it('prefers HTML over PDF and TXT', () => {
    expect(
      pickViewableBookUrl(
        book({
          'application/pdf': 'https://example.com/book.pdf',
          'text/plain': 'https://example.com/book.txt',
          'text/html': 'https://example.com/book.html',
        }),
      ),
    ).toBe('https://example.com/book.html');
  });

  it('skips zip HTML and falls back to PDF', () => {
    expect(
      pickViewableBookUrl(
        book({
          'text/html': 'https://example.com/book.zip',
          'application/pdf': 'https://example.com/book.pdf',
        }),
      ),
    ).toBe('https://example.com/book.pdf');
  });

  it('returns null when no viewable format exists', () => {
    expect(
      pickViewableBookUrl(
        book({
          'application/octet-stream': 'https://example.com/book.epub',
        }),
      ),
    ).toBeNull();
  });
});
