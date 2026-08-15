import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Heart, LogOut, Menu, Moon, Sun, Ticket, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrandLockup } from "@/components/site/brand";
import { initialsOf, useApp } from "@/hooks/use-app";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Explore Events" },
  { to: "/categories", label: "Categories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/my-registrations", label: "My Registrations" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, user, favorites, logOut } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6"
      >
        <Link to="/" className="min-w-0" aria-label="UpskillOn home">
          <BrandLockup />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {link.label === "Favorites" && <Heart className="size-4" aria-hidden />}
                  {link.label}
                  {link.label === "Favorites" && favorites.length > 0 && (
                    <span className="rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden min-h-11 gap-2 lg:inline-flex">
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {initialsOf(user.name)}
                  </span>
                  <span className="max-w-28 truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="size-4" aria-hidden /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-registrations">
                    <Ticket className="size-4" aria-hidden /> My Registrations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">
                    <Heart className="size-4" aria-hidden /> Saved Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="size-4" aria-hidden /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 lg:hidden"
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
        <div id="mobile-menu" className="animate-rise border-t border-border bg-surface lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  activeProps={{ className: "bg-secondary" }}
                >
                  {link.label}
                  {link.label === "Favorites" && favorites.length > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Profile
                  </Link>
                </li>
                <li className="pt-1">
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <li className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
