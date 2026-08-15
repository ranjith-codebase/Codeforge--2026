import { Link } from "@tanstack/react-router";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { BrandLockup } from "@/components/site/brand";

const NAV = [
  { to: "/events", label: "Explore Events" },
  { to: "/categories", label: "Categories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/my-registrations", label: "My Registrations" },
  { to: "/profile", label: "Profile" },
  { to: "/about", label: "About" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <BrandLockup />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            UpskillOn helps you discover hackathons, competitions, workshops and learning experiences
            worth your time — and keeps track of everything you save and join.
          </p>
          <div className="mt-5 flex gap-2" aria-hidden>
            {[Globe, Github, Twitter, Linkedin].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="min-w-0">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link className="transition-colors hover:text-foreground" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} UpskillOn
      </p>
    </footer>
  );
}
