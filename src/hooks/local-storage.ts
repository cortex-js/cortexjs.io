import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | undefined = undefined,
) {
  if (initialValue === undefined) window.localStorage.removeItem(key);

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | undefined) => {
    setStoredValue(value);
    if (value === undefined) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}
