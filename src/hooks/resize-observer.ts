import { useEffect } from "react";

export function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: ResizeObserverCallback,
): void {
  useEffect(() => {
    // `"current" in target` does not narrow a `T | RefObject<T>` union for
    // TypeScript, because `T` is a type parameter, so the two sides are cast.
    const tg: T | null =
      target && "current" in target
        ? (target as React.RefObject<T>).current
        : (target as T | null);
    if (!tg) return () => {};

    let subscribed = true;

    const observer = new ResizeObserver(
      (entries) => subscribed && callback(entries, observer),
    );
    observer.observe(tg);

    return () => {
      subscribed = false;
      observer.disconnect();
    };
  }, [target, callback]);
}
