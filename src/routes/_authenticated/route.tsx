import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { ExternalLink, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/Logo.png";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card/95 shadow-soft sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
                <img src={logo} alt="Skill Zone" className="h-full w-full object-contain p-0.5" />
              </span>
              <span className="font-display text-base font-bold">
                Skill Zone <span className="text-accent">Admin</span>
              </span>
            </div>
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                to="/admin/testimonials"
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                Testimonials
              </Link>
              <Link
                to="/admin/results"
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                Results
              </Link>
              <Link
                to="/admin/content"
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                Site Content
              </Link>
              <Link
                to="/admin/registrations"
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                Registrations
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="text-muted-foreground hover:text-destructive inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <nav className="flex flex-wrap gap-1 border-t px-4 py-2 sm:hidden">
          <Link
            to="/admin/testimonials"
            activeOptions={{ exact: true }}
            className="text-muted-foreground rounded-lg px-3 py-1.5 text-sm font-medium"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Testimonials
          </Link>
          <Link
            to="/admin/results"
            activeOptions={{ exact: true }}
            className="text-muted-foreground rounded-lg px-3 py-1.5 text-sm font-medium"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Results
          </Link>
          <Link
            to="/admin/content"
            activeOptions={{ exact: true }}
            className="text-muted-foreground rounded-lg px-3 py-1.5 text-sm font-medium"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Site Content
          </Link>
          <Link
            to="/admin/registrations"
            activeOptions={{ exact: true }}
            className="text-muted-foreground rounded-lg px-3 py-1.5 text-sm font-medium"
            activeProps={{ className: "bg-muted text-foreground" }}
          >
            Registrations
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
