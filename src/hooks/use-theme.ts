import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = readStorage<Theme | null>(STORAGE_KEYS.theme, null);
    const initial: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      writeStorage(STORAGE_KEYS.theme, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
