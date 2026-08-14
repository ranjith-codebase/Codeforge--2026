import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = readStorage<unknown>(STORAGE_KEYS.favorites, []);
    if (Array.isArray(stored)) {
      setFavorites(stored.filter((id): id is string => typeof id === "string"));
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      writeStorage(STORAGE_KEYS.favorites, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
