import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Page } from "@/components/site/page";
import { useApp } from "@/hooks/use-app";

const TITLE = "Log in — UpskillOn";
const DESCRIPTION = "Log in to UpskillOn to save events, register and track your registrations.";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search["redirect"] === "string" ? { redirect: search["redirect"] } : {},
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const { logIn } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    const result = logIn(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: redirect ?? "/events", search: redirect ? undefined : {} });
  };

  return (
    <Page className="max-w-md">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Log in to continue discovering and registering for events.
      </p>

      <form onSubmit={onSubmit} noValidate className="surface-card mt-8 space-y-4 p-6">
        <div>
          <Label htmlFor="login-email" className="mb-1.5">
            Email
          </Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="h-11"
          />
        </div>
        <div>
          <Label htmlFor="login-password" className="mb-1.5">
            Password
          </Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="h-11"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg">
          Log in
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            search={redirect ? { redirect } : {}}
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Page>
  );
}
