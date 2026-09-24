import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { EDITABLE_TEXT_DEFAULTS, EDITABLE_TEXT_SECTIONS } from "@/lib/site-text-fields";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-texts.functions";
import { SITE_TEXTS_QUERY_KEY } from "@/hooks/use-site-texts";

export const Route = createFileRoute("/_authenticated/admin/content")({
  head: () => ({
    meta: [
      { title: "Site Content — Skill Zone Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SiteContentAdmin,
});

function SiteContentAdmin() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "site-texts"],
    queryFn: () => getSiteTexts(),
  });

  const defaults: Record<string, string> = { ...EDITABLE_TEXT_DEFAULTS };
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setValues({ ...defaults, ...data });
      setDirty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function setField(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setDirty(true);
  }

  function resetField(key: string) {
    setField(key, defaults[key] ?? "");
  }

  async function onSaveAll() {
    if (saving) return;
    setSaving(true);
    try {
      const entries = Object.entries(values).map(([key, value]) => ({ key, value }));
      await saveSiteTexts({ data: { entries } });
      toast.success("Website text updated");
      setDirty(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin", "site-texts"] }),
        queryClient.invalidateQueries({ queryKey: SITE_TEXTS_QUERY_KEY }),
      ]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (error) {
    return (
      <div className="bg-card shadow-soft mx-auto max-w-lg rounded-2xl p-8 text-center">
        <h1 className="font-display text-lg font-bold">Access restricted</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Your account doesn't have the admin role yet. Ask the site owner to grant
          you the admin role, then reload this page.
        </p>
        <p className="text-muted-foreground/70 mt-4 text-xs break-all">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Site Content</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Edit the headlines, taglines and contact details shown on the homepage. Leave a
            field empty and reset it to fall back to the default copy.
          </p>
        </div>
      </div>

      {isPending ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading content…
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {EDITABLE_TEXT_SECTIONS.map((section) => (
            <div key={section.id} className="bg-card shadow-soft rounded-2xl p-5 sm:p-6">
              <h2 className="font-display text-base font-bold">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <label htmlFor={field.key} className="text-sm font-semibold">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        onClick={() => resetField(field.key)}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset to default
                      </button>
                    </div>
                    {field.multiline ? (
                      <textarea
                        id={field.key}
                        rows={3}
                        value={values[field.key] ?? ""}
                        onChange={(e) => setField(field.key, e.target.value)}
                        className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                      />
                    ) : (
                      <input
                        id={field.key}
                        type="text"
                        value={values[field.key] ?? ""}
                        onChange={(e) => setField(field.key, e.target.value)}
                        className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {dirty && (
        <div className="bg-card shadow-lift fixed inset-x-0 bottom-0 z-40 border-t px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">You have unsaved changes.</p>
            <button
              type="button"
              onClick={onSaveAll}
              disabled={saving}
              className="bg-primary text-primary-foreground shadow-soft inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
