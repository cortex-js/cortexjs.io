import { useCallback, useEffect, useRef } from "react";

export default function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  useEffect(() => (callbackRef.current = callback), [callback]);

  const timeoutRef = useRef(undefined);
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
