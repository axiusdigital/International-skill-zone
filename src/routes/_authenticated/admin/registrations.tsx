import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { listRegistrations } from "@/lib/registrations.functions";

export const Route = createFileRoute("/_authenticated/admin/registrations")({
  head: () => ({
    meta: [
      { title: "Registrations — Skill Zone Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RegistrationsAdmin,
});

function RegistrationsAdmin() {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "registrations"],
    queryFn: () => listRegistrations(),
  });

  if (error) {
    return (
      <div className="bg-card shadow-soft mx-auto max-w-lg rounded-2xl p-8 text-center">
        <h1 className="font-display text-lg font-bold">Access restricted</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Your account doesn't have the admin role yet. Ask the site owner to grant
          you the admin role, then reload this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Registrations</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Leads submitted through the website registration form, newest first.
      </p>

      {isPending ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading registrations…
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-card shadow-soft mt-6 rounded-2xl p-12 text-center">
          <p className="text-muted-foreground text-sm">
            No registrations yet. New form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {data.map((r) => (
            <div key={r.id} className="bg-card shadow-soft rounded-2xl p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-sm font-bold">{r.name}</p>
                <span className="bg-accent-soft text-accent-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {r.course}
                </span>
                <span className="text-muted-foreground ml-auto text-xs">
                  {format(new Date(r.created_at), "dd MMM yyyy, hh:mm a")}
                </span>
              </div>
              <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <span>📞 {r.phone}</span>
                {r.city && <span>📍 {r.city}</span>}
                {r.profession && <span>💼 {r.profession}</span>}
                {r.desired_score && <span>🎯 {r.desired_score}</span>}
                {r.age != null && <span>Age {r.age}</span>}
              </div>
              {r.extra_remarks && (
                <p className="text-muted-foreground bg-muted mt-3 rounded-lg px-3 py-2 text-sm">
                  {r.extra_remarks}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
