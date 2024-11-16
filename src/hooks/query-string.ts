import { useState } from "react";

export function useQueryString<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const item = searchParams.get(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, JSON.stringify(value));
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`,
    );
  };

  return [storedValue, setValue] as const;
}

export function useQueryStrings<T>(keys: string[], initialValues: T[]) {
  const [storedValues, setStoredValues] = useState<T[]>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return keys.map((key, index) => {
      const item = searchParams.get(key);
      return item ? JSON.parse(item) : initialValues[index];
    });
  });

  const setValues = (values: T[]) => {
    setStoredValues(values);
    const searchParams = new URLSearchParams(window.location.search);
    keys.forEach((key, index) => {
      searchParams.set(key, JSON.stringify(values[index]));
    });
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`,
    );
  };

  return [storedValues, setValues] as const;
}
