import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useDarkTheme() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useHighContrast() {
  return useMediaQuery("(prefers-contrast: active)");
}

export function useHover() {
  return useMediaQuery("(hover: hover)");
}

export function useAnyFinePointer() {
  return useMediaQuery("(any-pointer: fine)");
}

export function useCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

export function useAnyHover() {
  return useMediaQuery("(any-hover: hover)");
}

export function useLandscapeOrientation() {
  return useMediaQuery("(orientation: landscape)");
}

export function usePortraitOrientation() {
  return useMediaQuery("(orientation: portrait)");
}
