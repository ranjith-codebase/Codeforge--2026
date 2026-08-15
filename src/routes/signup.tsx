import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Page } from "@/components/site/page";
import { useApp } from "@/hooks/use-app";
import { INTEREST_OPTIONS } from "@/lib/event-utils";
import { cn } from "@/lib/utils";

const TITLE = "Create your account — UpskillOn";
const DESCRIPTION =
  "Create an UpskillOn account to save events, get recommendations and register in a couple of clicks.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "college", string>>;

export const Route = createFileRoute("/signup")({
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
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = Route.useSearch();
  const { signUp } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [college, setCollege] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const toggleInterest = (value: string) =>
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email, e.g. you@college.edu.";
    if (password.length < 6) next.password = "Use at least 6 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!college.trim()) next.college = "Please enter your college or institution.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const result = signUp({ name, email, password, college, interests });
    if (!result.ok) {
      setErrors({ email: result.error });
      return;
    }
    toast.success("Account created");
    if (redirect) navigate({ href: redirect });
    else navigate({ to: "/events" });
  };

  return (
    <Page className="max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Save events, get recommendations and keep all your registrations in one place.
      </p>

      <form onSubmit={onSubmit} noValidate className="surface-card mt-8 space-y-4 p-6">
        <Field id="su-name" label="Full name" error={errors.name}>
          <Input
            id="su-name"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="h-11"
          />
        </Field>
        <Field id="su-email" label="Email" error={errors.email}>
          <Input
            id="su-email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="h-11"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="su-password" label="Password" error={errors.password}>
            <Input
              id="su-password"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
              className="h-11"
            />
          </Field>
          <Field id="su-confirm" label="Confirm password" error={errors.confirm}>
            <Input
              id="su-confirm"
              type="password"
              value={confirm}
              autoComplete="new-password"
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={Boolean(errors.confirm)}
              className="h-11"
            />
          </Field>
        </div>
        <Field id="su-college" label="College / Institution" error={errors.college}>
          <Input
            id="su-college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            aria-invalid={Boolean(errors.college)}
            className="h-11"
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-medium">Which areas interest you?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((option) => {
              const active = interests.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleInterest(option)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-2 text-sm transition-all active:scale-95",
                    active
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            search={redirect ? { redirect } : {}}
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </Page>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
