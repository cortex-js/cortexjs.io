import { useEffect } from "react";

export function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: ResizeObserverCallback,
): void {
  useEffect(() => {
    const tg = target && "current" in target ? target.current : target;
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
