import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Theme } from "@/hooks/use-theme";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#favorites", label: "Favorites" },
];

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
  favoritesCount: number;
  onRegisterClick: () => void;
};

export function Navbar({ theme, onToggleTheme, favoritesCount, onRegisterClick }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6"
      >
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
            CF
          </span>
          <span className="truncate font-display text-base font-bold tracking-tight sm:text-lg">
            CodeForge <span className="text-primary">WebSprint</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label === "Favorites" && <Heart className="size-4" aria-hidden />}
                  {link.label}
                  {link.label === "Favorites" && favoritesCount > 0 && (
                    <span className="rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                      {favoritesCount}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <Button className="hidden md:inline-flex" onClick={onRegisterClick}>
            Register Now
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-rise border-t border-border bg-surface md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                  {link.label === "Favorites" && favoritesCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      {favoritesCount}
                    </span>
                  )}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <Button
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  onRegisterClick();
                }}
              >
                Register Now
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
