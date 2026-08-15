import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("animate-rise mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14", className)}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2 md:justify-end">{actions}</div>}
    </header>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel = "Explore Events",
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      {icon && <span className="grid size-12 place-items-center rounded-full bg-secondary">{icon}</span>}
      <h2 className="mt-4 text-lg font-bold">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      <Button className="mt-5" asChild>
        <Link to="/events">{ctaLabel}</Link>
      </Button>
    </div>
  );
}
