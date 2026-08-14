import { cn } from "@/lib/utils";

/**
 * UpskillOn brand mark — an upward node path (learning / growth / discovery)
 * drawn as connected digital nodes inside a rounded tile.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary,none)] bg-primary",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" fill="none" stroke="currentColor">
        <path
          d="M4 17.5 9 12l3.5 3.5L20 7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="17.5" r="1.9" fill="currentColor" stroke="none" />
        <circle cx="9" cy="12" r="1.9" fill="currentColor" stroke="none" />
        <circle cx="12.5" cy="15.5" r="1.9" fill="currentColor" stroke="none" />
        <circle cx="20" cy="7" r="2.4" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("truncate font-display text-base font-bold tracking-tight sm:text-lg", className)}>
      Upskill<span className="text-primary">On</span>
    </span>
  );
}

export function BrandLockup({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <BrandMark className={markClassName} />
      <BrandWordmark />
    </span>
  );
}
