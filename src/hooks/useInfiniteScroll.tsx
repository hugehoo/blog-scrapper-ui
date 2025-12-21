import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps {
  fetchMore: (page: number) => Promise<unknown[]>;
  hasMore: boolean;
  threshold?: number;
}

interface UseInfiniteScrollReturn {
  isLoading: boolean;
  error: string | null;
  targetRef: React.RefObject<HTMLDivElement>;
  reset: () => void;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  threshold = 100
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    console.log('loadMore called:', { isFetching: isFetchingRef.current, hasMore, page });
    if (isFetchingRef.current || !hasMore) {
      console.log('loadMore aborted:', { isFetching: isFetchingRef.current, hasMore });
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      console.log('Fetching page:', nextPage);
      await fetchMore(nextPage);
      setPage(nextPage);
      console.log('loadMore completed successfully for page:', nextPage);
    } catch (err) {
      console.error('loadMore error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load more content');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [fetchMore, hasMore, page]);

  const reset = useCallback(() => {
    setPage(1);
    setError(null);
    setIsLoading(false);
    isFetchingRef.current = false;
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        console.log('Intersection observed:', {
          isIntersecting: entries[0].isIntersecting,
          hasMore,
          currentPage: page
        });
        if (entries[0].isIntersecting) {
          console.log('Target is intersecting, calling loadMore');
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${threshold}px`,
      }
    );

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, threshold]);

  return {
    isLoading,
    error,
    targetRef,
    reset
  };
};