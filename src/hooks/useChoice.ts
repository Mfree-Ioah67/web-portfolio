import { useCallback, useState } from "react";

// A small piece of state remembered in localStorage. Storage can be blocked
// (private windows, strict settings); the page then just forgets.
export function useChoice<T extends string>(key: string, allowed: readonly T[], fallback: () => T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && (allowed as readonly string[]).includes(saved)) return saved as T;
    } catch {
      // storage unavailable
    }
    return fallback();
  });

  const choose = useCallback(
    (next: T) => {
      setValue(next);
      try {
        localStorage.setItem(key, next);
      } catch {
        // storage unavailable
      }
    },
    [key],
  );

  return [value, choose] as const;
}
