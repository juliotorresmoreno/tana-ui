import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isClient = typeof window !== "undefined";
  let localValue = null;
  if (isClient) {
    const storedValue = localStorage.getItem(key);
    if (storedValue === undefined || storedValue === null) {
      localValue = initialValue;
    } else {
      localValue = JSON.parse(storedValue);
    }
  }

  const [value, setValue] = useState<T>(localValue);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isClient, key, value]);

  return [value, setValue] as const;
};
