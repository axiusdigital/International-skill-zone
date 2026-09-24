import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/Logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Skill Zone" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/testimonials" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    setInfo(null);

    if (mode === "sign-up") {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
        setPending(false);
        return;
      }
      if (!data.session) {
        setInfo(
          "Account created. Check your email to confirm it, then sign in. Ask the site owner to grant your account the admin role.",
        );
        setPending(false);
        return;
      }
      setInfo(
        "Account created. Ask the site owner to grant your account the admin role before using the dashboard.",
      );
      setPending(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }
    navigate({ to: "/admin/testimonials" });
  }

  return (
    <div className="bg-primary relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden
        className="bg-accent/10 absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-primary-light/40 absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md">
            <img src={logo} alt="Skill Zone" className="h-full w-full object-contain p-1.5" />
          </span>
          <h1 className="font-display text-primary-foreground mt-5 text-2xl font-bold">
            Skill Zone Admin
          </h1>
          <p className="text-primary-foreground/60 mt-1 text-sm">
            {mode === "sign-in"
              ? "Sign in to manage testimonials, results and website text"
              : "Create an admin account for the dashboard"}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-card shadow-lift space-y-5 rounded-2xl p-8"
        >
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-sm font-semibold">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@internationalskillzone.com"
              className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-sm font-semibold">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          {error && (
            <p className="bg-destructive/10 text-destructive rounded-lg px-4 py-2.5 text-sm font-medium">
              {error}
            </p>
          )}
          {info && (
            <p className="bg-accent/10 text-accent-foreground rounded-lg px-4 py-2.5 text-sm font-medium">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-primary text-primary-foreground shadow-soft hover:shadow-card inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {mode === "sign-in" ? "Signing in…" : "Creating account…"}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                {mode === "sign-in" ? "Sign In" : "Create Account"}
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "sign-in" ? "sign-up" : "sign-in"));
              setError(null);
              setInfo(null);
            }}
            className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
          >
            {mode === "sign-in"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </p>
        <p className="mt-2 text-center">
          <Link
            to="/"
            className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
          >
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
