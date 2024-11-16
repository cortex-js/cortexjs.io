import { useEffect, useRef } from "react";

/**
 * The useEventListener hook allows you to listen for events on 
 * the window or any DOM element.
 * 
 * Example usage:
 * 
 * ```tsx
 * import { useRef } from "react";
 * import useEventListener from "./useEventListener";
 * 
 * export default function App() {
 *  const buttonRef = useRef<HTMLButtonElement>(null);
 * 
 * useEventListener(buttonRef, "click", () => {
 *   console.log("Button clicked");
 * });
 * 
 * return <button ref={buttonRef}>Click me</button>;
 * }
 * 
 * ```
 * 
 */

export type Listener<K extends keyof WindowEventMap> = (
  this: Window,
  ev: WindowEventMap[K],
) => any;

export default function useEventListener<
  K extends keyof WindowEventMap,
  T extends HTMLElement = HTMLElement,
>(target: React.RefObject<T> | T | null, eventType: K, listener: Listener<K>) {
  const callbackRef = useRef(listener);

  const tg = (
    target && "current" in target ? target.current : target
  ) as T | null;

  useEffect(() => {
    callbackRef.current = listener;
  }, [listener]);

  useEffect(() => {
    if (tg == null) return;
    const handler = (e) => callbackRef.current.bind(window, e);

    tg.addEventListener(eventType, handler);

    return () => tg.removeEventListener(eventType, handler);
  }, [eventType, tg]);
}
