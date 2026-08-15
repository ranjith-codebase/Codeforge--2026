import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/site/page";
import { useApp } from "@/hooks/use-app";

export function RequireAuth({ title, children }: { title: string; children: ReactNode }) {
  const { ready, user } = useApp();
  const location = useLocation();

  if (!ready) {
    return (
      <Page>
        <div className="surface-card h-64 animate-pulse" aria-busy="true" aria-label="Loading" />
      </Page>
    );
  }

  if (!user) {
    return (
      <Page>
        <div className="surface-card mx-auto flex max-w-md flex-col items-center px-6 py-14 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in or create your UpskillOn account to continue.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/login" search={{ redirect: location.href }}>
                Log in
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup" search={{ redirect: location.href }}>
                Sign up
              </Link>
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  return <>{children}</>;
}
