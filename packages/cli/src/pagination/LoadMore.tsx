"use client";
import * as React from "react";
import { Button } from "@/cosmic/elements/Button";

type loadMoreAction<T extends string | number = any> = T extends number
  ? (offset: T) => Promise<readonly [React.JSX.Element, number | null]>
  : T extends string
  ? (offset: T) => Promise<readonly [React.JSX.Element, string | null]>
  : any;

export const LoadMore = <T extends string | number = any>({
  children,
  initialOffset,
  loadMoreAction,
  total,
  limit,
  className,
}: React.PropsWithChildren<{
  initialOffset: number;
  loadMoreAction: loadMoreAction<T>;
  total: number;
  limit: number;
  className?: string;
}>) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [loadMoreNodes, setLoadMoreNodes] = React.useState<React.JSX.Element[]>(
    []
  );

  const [disabled, setDisabled] = React.useState(false);
  const currentOffsetRef = React.useRef<number | string | undefined>(
    initialOffset
  );
  // const [scrollLoad, setScrollLoad] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(initialOffset);

  const loadMore = React.useCallback(
    async (abortController?: AbortController) => {
      setLoading(true);
      setOffset(limit + offset);
      // @ts-expect-error Can't yet figure out how to type this
      loadMoreAction(currentOffsetRef.current)
        .then(([node, next]) => {
          if (abortController?.signal.aborted) return;

          setLoadMoreNodes((prev) => [...prev, node]);
          if (next === null) {
            currentOffsetRef.current ??= undefined;
            setDisabled(true);
            return;
          }

          currentOffsetRef.current = next;
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    },
    [loadMoreAction, offset, limit]
  );

  // If you want to trigger load more on scroll
  // React.useEffect(() => {
  //   const signal = new AbortController();

  //   const element = ref.current;

  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting && element?.disabled === false) {
  //       loadMore(signal);
  //     }
  //   });

  //   if (element && scrollLoad) {
  //     observer.observe(element);
  //   }

  //   return () => {
  //     signal.abort();
  //     if (element) {
  //       observer.unobserve(element);
  //     }
  //   };
  // }, [loadMore]);

  const hasMore = offset + limit < total;
  return (
    <>
      <div className={className}>
        {children}
        {loadMoreNodes}
      </div>
      {hasMore || loading ? (
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            ref={ref}
            disabled={disabled || loading}
            onClick={() => loadMore()}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
