import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";

export type Theme = "light" | "dark";

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  /** Demo-only local credential. Never sent anywhere. */
  password: string;
  college: string;
  interests: string[];
  createdAt: string;
};

export type PublicUser = Omit<LocalUser, "password">;

export type Registration = {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  status: "Registered";
};

const GUEST = "guest";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type AppContextValue = {
  ready: boolean;
  theme: Theme;
  toggleTheme: () => void;
  user: PublicUser | null;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
    college: string;
    interests: string[];
  }) => { ok: true } | { ok: false; error: string; field?: "email" };
  logIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logOut: () => void;
  updateProfile: (input: { name: string; college: string; interests: string[] }) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
  registrations: Registration[];
  isRegistered: (eventId: string) => boolean;
  registerForEvent: (eventId: string) => { ok: true } | { ok: false; error: string };
  recentlyViewed: string[];
  markViewed: (eventId: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoritesMap, setFavoritesMap] = useState<Record<string, string[]>>({});
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [recentMap, setRecentMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const storedTheme = readStorage<Theme | null>(STORAGE_KEYS.theme, null);
    setTheme(
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );
    setUsers(readStorage<LocalUser[]>(STORAGE_KEYS.users, []));
    setUserId(readStorage<string | null>(STORAGE_KEYS.session, null));
    setFavoritesMap(readStorage<Record<string, string[]>>(STORAGE_KEYS.favorites, {}));
    setRegistrations(readStorage<Registration[]>(STORAGE_KEYS.registrations, []));
    setRecentMap(readStorage<Record<string, string[]>>(STORAGE_KEYS.recent, {}));
    setReady(true);
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

  const user = useMemo<PublicUser | null>(() => {
    const found = users.find((u) => u.id === userId);
    if (!found) return null;
    const { password: _password, ...rest } = found;
    return rest;
  }, [users, userId]);

  const scope = userId ?? GUEST;
  const favorites = useMemo(() => favoritesMap[scope] ?? [], [favoritesMap, scope]);
  const recentlyViewed = useMemo(() => recentMap[scope] ?? [], [recentMap, scope]);

  const persistUsers = (next: LocalUser[]) => {
    setUsers(next);
    writeStorage(STORAGE_KEYS.users, next);
  };

  const signUp: AppContextValue["signUp"] = useCallback(
    ({ name, email, password, college, interests }) => {
      const mail = normalizeEmail(email);
      const existing = readStorage<LocalUser[]>(STORAGE_KEYS.users, []);
      if (existing.some((u) => u.email === mail)) {
        return { ok: false, error: "An account with this email already exists.", field: "email" };
      }
      const account: LocalUser = {
        id: uid(),
        name: name.trim(),
        email: mail,
        password,
        college: college.trim(),
        interests,
        createdAt: new Date().toISOString(),
      };
      const next = [...existing, account];
      persistUsers(next);
      setUserId(account.id);
      writeStorage(STORAGE_KEYS.session, account.id);
      return { ok: true };
    },
    [],
  );

  const logIn: AppContextValue["logIn"] = useCallback((email, password) => {
    const mail = normalizeEmail(email);
    const existing = readStorage<LocalUser[]>(STORAGE_KEYS.users, []);
    setUsers(existing);
    const found = existing.find((u) => u.email === mail && u.password === password);
    if (!found) return { ok: false, error: "Email or password is incorrect." };
    setUserId(found.id);
    writeStorage(STORAGE_KEYS.session, found.id);
    return { ok: true };
  }, []);

  const logOut = useCallback(() => {
    setUserId(null);
    writeStorage(STORAGE_KEYS.session, null);
  }, []);

  const updateProfile: AppContextValue["updateProfile"] = useCallback(
    ({ name, college, interests }) => {
      setUsers((prev) => {
        const next = prev.map((u) =>
          u.id === userId ? { ...u, name: name.trim(), college: college.trim(), interests } : u,
        );
        writeStorage(STORAGE_KEYS.users, next);
        return next;
      });
    },
    [userId],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      let saved = false;
      setFavoritesMap((prev) => {
        const current = prev[scope] ?? [];
        const has = current.includes(id);
        saved = !has;
        const next = {
          ...prev,
          [scope]: has ? current.filter((x) => x !== id) : [...current, id],
        };
        writeStorage(STORAGE_KEYS.favorites, next);
        return next;
      });
      return saved;
    },
    [scope],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const userRegistrations = useMemo(
    () => (userId ? registrations.filter((r) => r.userId === userId) : []),
    [registrations, userId],
  );

  const isRegistered = useCallback(
    (eventId: string) => userRegistrations.some((r) => r.eventId === eventId),
    [userRegistrations],
  );

  const registerForEvent: AppContextValue["registerForEvent"] = useCallback(
    (eventId) => {
      if (!userId) return { ok: false, error: "Please log in to register." };
      if (registrations.some((r) => r.userId === userId && r.eventId === eventId)) {
        return { ok: false, error: "You're already registered for this event." };
      }
      const entry: Registration = {
        id: uid(),
        userId,
        eventId,
        registeredAt: new Date().toISOString(),
        status: "Registered",
      };
      const next = [...registrations, entry];
      setRegistrations(next);
      writeStorage(STORAGE_KEYS.registrations, next);
      return { ok: true };
    },
    [registrations, userId],
  );

  const markViewed = useCallback(
    (eventId: string) => {
      setRecentMap((prev) => {
        const current = prev[scope] ?? [];
        if (current[0] === eventId) return prev;
        const next = {
          ...prev,
          [scope]: [eventId, ...current.filter((x) => x !== eventId)].slice(0, 6),
        };
        writeStorage(STORAGE_KEYS.recent, next);
        return next;
      });
    },
    [scope],
  );

  const value: AppContextValue = {
    ready,
    theme,
    toggleTheme,
    user,
    signUp,
    logIn,
    logOut,
    updateProfile,
    favorites,
    isFavorite,
    toggleFavorite,
    registrations: userRegistrations,
    isRegistered,
    registerForEvent,
    recentlyViewed,
    markViewed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
