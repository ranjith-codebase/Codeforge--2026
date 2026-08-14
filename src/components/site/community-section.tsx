import { useState, type FormEvent } from "react";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/section";
import { cn } from "@/lib/utils";

const CHECKLIST = [
  "Form a team of 3–4 with complementary skills.",
  "Lock the problem statement in the first 2 hours.",
  "Ship a working slice before adding polish.",
  "Keep a demo script and a backup recording ready.",
  "Prepare a 3-minute pitch: problem, demo, impact.",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function CommunitySection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setJoined(true);
  };

  return (
    <section className="border-b border-border bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="surface-card h-full p-6 sm:p-8">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                <Mail className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-2xl font-bold">Stay in the Tech Loop</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Get updates about upcoming hackathons, workshops and technical events.
              </p>

              {joined ? (
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="size-4" aria-hidden />
                  You're on the list!
                </p>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
                  <div>
                    <Label htmlFor="community-email" className="mb-1.5">
                      Email
                    </Label>
                    <Input
                      id="community-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "community-email-error" : undefined}
                      className={cn("h-11", error && "border-destructive")}
                    />
                    {error && (
                      <p id="community-email-error" role="alert" className="mt-1.5 text-sm text-destructive">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button type="submit" variant="outline" className="w-full sm:w-auto">
                    Join the Tech Community
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="surface-card h-full p-6 sm:p-8">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                <Download className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-2xl font-bold">Free Student Hackathon Checklist</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Five habits that separate finished demos from unfinished ideas.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setShowChecklist((v) => !v)}>
                {showChecklist ? "Hide checklist" : "Show the checklist"}
              </Button>
              {showChecklist && (
                <ol className="animate-rise mt-5 space-y-2 text-sm text-muted-foreground">
                  {CHECKLIST.map((item, index) => (
                    <li key={item} className="flex gap-2">
                      <span className="font-display font-bold text-primary">{index + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
