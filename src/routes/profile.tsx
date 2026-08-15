import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Page, PageHeader } from "@/components/site/page";
import { RequireAuth } from "@/components/site/require-auth";
import { useApp, initialsOf } from "@/hooks/use-app";
import { INTEREST_OPTIONS } from "@/lib/event-utils";

const TITLE = "Your Profile — UpskillOn";
const DESCRIPTION = "Manage your UpskillOn profile details and technology interests.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: () => (
    <RequireAuth title="Your Profile">
      <ProfilePage />
    </RequireAuth>
  ),
});

function ProfilePage() {
  const { user, updateProfile, favorites, registrations } = useApp();
  const [name, setName] = useState(user?.name ?? "");
  const [college, setCollege] = useState(user?.college ?? "");
  const [interests, setInterests] = useState<string[]>(user?.interests ?? []);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setCollege(user.college);
    setInterests(user.interests);
  }, [user]);

  const toggleInterest = (value: string) =>
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    updateProfile({ name, college, interests });
    toast.success("Profile updated");
  };

  return (
    <Page className="max-w-3xl">
      <PageHeader eyebrow="Account" title="Your Profile" description="Keep your details up to date." />

      <div className="surface-card mt-8 flex flex-wrap items-center gap-4 p-6">
        <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-lg font-bold text-primary">
          {initialsOf(user?.name ?? "")}
        </span>
        <div className="min-w-0">
          <p className="text-lg font-bold">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <dl className="ml-auto flex gap-6 text-sm">
          <div>
            <dt className="text-muted-foreground">Saved</dt>
            <dd className="text-xl font-bold">{favorites.length}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Registered</dt>
            <dd className="text-xl font-bold">{registrations.length}</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={onSubmit} className="surface-card mt-5 space-y-4 p-6">
        <div>
          <Label htmlFor="profile-name" className="mb-1.5">
            Full name
          </Label>
          <Input id="profile-name" className="h-11" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="profile-college" className="mb-1.5">
            College / Institution
          </Label>
          <Input
            id="profile-college"
            className="h-11"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Interests</legend>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((option) => {
              const active = interests.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInterest(option)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
        <Button type="submit" size="lg">
          Save Changes
        </Button>
      </form>
    </Page>
  );
}
