import {buildBooksUrl, rewritePaginationUrl} from '../src/api/client';
import {API_BASE_URL} from '../src/config/env';

describe('rewritePaginationUrl', () => {
  it('rewrites internal gutendex hosts to the public API base', () => {
    const next =
      'http://gutendex-api:8974/books/?mime_type=image&page=2&topic=fiction';
    expect(rewritePaginationUrl(next)).toBe(
      `${API_BASE_URL}/books/?mime_type=image&page=2&topic=fiction`,
    );
  });

  it('rewrites pageUrl when building append requests', () => {
    expect(
      buildBooksUrl({
        topic: 'fiction',
        pageUrl:
          'http://gutendex-api:8974/books/?mime_type=image&page=2&topic=fiction',
      }),
    ).toBe(`${API_BASE_URL}/books/?mime_type=image&page=2&topic=fiction`);
  });

  it('returns null for null input', () => {
    expect(rewritePaginationUrl(null)).toBeNull();
  });
});
