import {API_BASE_URL, BOOKS_COVER_MIME_TYPE} from '../config/env';
import type {BooksResponse} from './types';

export type BookQuery = {
  topic: string;
  search?: string;
  pageUrl?: string | null;
};

export function buildBooksUrl({topic, search, pageUrl}: BookQuery): string {
  if (pageUrl) {
    return pageUrl;
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

export async function fetchBooks(query: BookQuery): Promise<BooksResponse> {
  const response = await fetch(buildBooksUrl(query));
  if (!response.ok) {
    throw new Error(`Gutendex request failed (${response.status})`);
  }
  return response.json();
}
