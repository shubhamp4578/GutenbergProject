import {useCallback, useEffect, useRef, useState} from 'react';
import {fetchBooks} from '../api/client';
import type {Book} from '../api/types';
import {SEARCH_DEBOUNCE_MS} from '../config/env';

type UseBooksOptions = {
  topic: string;
  search: string;
};

export function useBooks({topic, search}: UseBooksOptions) {
  const [books, setBooks] = useState<Book[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const loadingMoreLock = useRef(false);

  const load = useCallback(
    async (mode: 'replace' | 'append' | 'refresh', pageUrl?: string | null) => {
      const id = ++requestId.current;
      console.warn('[useBooks] load', mode, {topic, search, pageUrl});
      if (mode === 'replace') {
        setLoading(true);
        loadingMoreLock.current = false;
        setLoadingMore(false);
      } else if (mode === 'refresh') {
        setRefreshing(true);
      } else {
        loadingMoreLock.current = true;
        setLoadingMore(true);
      }
      setError(null);

      try {
        const data = await fetchBooks({
          topic,
          search,
          pageUrl: mode === 'append' ? pageUrl : undefined,
        });
        if (id !== requestId.current) {
          return;
        }
        setBooks(current =>
          mode === 'append' ? [...current, ...data.results] : data.results,
        );
        setNextUrl(data.next);
        console.warn('[useBooks] success', mode, data.results.length, data.next);
      } catch (err) {
        if (id !== requestId.current) {
          return;
        }
        console.warn('[useBooks] error', mode, String(err));
        setError('network');
        if (mode === 'replace') {
          setBooks([]);
        }
        // Prevent endless footer spinner retries on a bad/unreachable next URL.
        if (mode === 'append') {
          setNextUrl(null);
        }
      } finally {
        if (mode === 'append') {
          loadingMoreLock.current = false;
          setLoadingMore(false);
        }
        if (id === requestId.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [search, topic],
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      load('replace');
    }, search ? SEARCH_DEBOUNCE_MS : 0);
    return () => clearTimeout(handle);
  }, [load, search]);

  const loadMore = useCallback(() => {
    if (
      !nextUrl ||
      loading ||
      loadingMore ||
      refreshing ||
      loadingMoreLock.current
    ) {
      return;
    }
    load('append', nextUrl);
  }, [load, loading, loadingMore, nextUrl, refreshing]);

  const retry = useCallback(() => {
    load('replace');
  }, [load]);

  const refresh = useCallback(() => {
    load('refresh');
  }, [load]);

  return {
    books,
    loading,
    refreshing,
    loadingMore,
    error,
    nextUrl,
    loadMore,
    retry,
    refresh,
  };
}
