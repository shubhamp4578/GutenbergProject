import {API_BASE_URL, BOOKS_COVER_MIME_TYPE} from '../config/env';
import type {BooksResponse} from './types';

const FETCH_TIMEOUT_MS = 15000;

export type BookQuery = {
  topic: string;
  search?: string;
  pageUrl?: string | null;
};

/**
 * Gutendex returns pagination links with an internal host
 * (e.g. http://gutendex-api:8974/...). Rebuild the URL against
 * the public API base using path + query only.
 */
export function rewritePaginationUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }

  const queryIndex = url.indexOf('?');
  const query = queryIndex >= 0 ? url.slice(queryIndex + 1) : '';
  const withoutOrigin = url.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/?#]+/i, '');
  const pathOnly =
    (queryIndex >= 0
      ? withoutOrigin.slice(0, withoutOrigin.indexOf('?'))
      : withoutOrigin) || '/books';
  const path = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;

  if (query) {
    return `${API_BASE_URL}${path}?${query}`;
  }
  if (withoutOrigin !== url) {
    return `${API_BASE_URL}${path}`;
  }
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }
  return url;
}

export function buildBooksUrl({topic, search, pageUrl}: BookQuery): string {
  if (pageUrl) {
    return rewritePaginationUrl(pageUrl) ?? pageUrl;
  }

  const params = new URLSearchParams();
  params.set('topic', topic);
  params.set('mime_type', BOOKS_COVER_MIME_TYPE);
  const trimmed = search?.trim();
  if (trimmed) {
    params.set('search', trimmed);
  }
  return `${API_BASE_URL}/books?${params.toString()}`;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  // Promise.race so a hung DNS/connect cannot leave the UI spinner forever
  // even if AbortController is ignored by the native networking stack.
  return await Promise.race([
    fetch(url),
    new Promise<Response>((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Gutendex request timed out after ${FETCH_TIMEOUT_MS}ms`,
          ),
        );
      }, FETCH_TIMEOUT_MS);
    }),
  ]);
}

export async function fetchBooks(query: BookQuery): Promise<BooksResponse> {
  const requestUrl = buildBooksUrl(query);
  console.warn('[Gutendex] GET', requestUrl);
  const response = await fetchWithTimeout(requestUrl);
  if (!response.ok) {
    throw new Error(`Gutendex request failed (${response.status})`);
  }
  const data = (await response.json()) as BooksResponse;
  const next = rewritePaginationUrl(data.next);
  const previous = rewritePaginationUrl(data.previous);
  console.warn(
    '[Gutendex] ok',
    data.results?.length ?? 0,
    'next=',
    next,
    'rawNext=',
    data.next,
  );
  return {
    ...data,
    next,
    previous,
  };
}
