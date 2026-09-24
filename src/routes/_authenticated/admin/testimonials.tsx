import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { COURSE_OPTIONS } from "@/lib/content";
import type { Testimonial, TestimonialInput } from "@/lib/types";
import {
  createTestimonial,
  deleteTestimonial,
  listAllTestimonials,
  reorderTestimonials,
  setTestimonialPublished,
  updateTestimonial,
} from "@/lib/testimonials.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Manage Testimonials — Skill Zone Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TestimonialsAdmin,
});

const EMPTY_FORM: TestimonialInput = {
  student_name: "",
  course: COURSE_OPTIONS[0] ?? "PTE Preparation",
  quote: "",
  rating: 5,
  is_published: true,
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i <= rating ? "fill-accent text-accent" : "text-border",
          )}
        />
      ))}
    </span>
  );
}

function TestimonialsAdmin() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => listAllTestimonials(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      student_name: t.student_name,
      course: t.course,
      quote: t.quote,
      rating: t.rating,
      is_published: t.is_published,
    });
    setDialogOpen(true);
  };

  async function onSave() {
    if (saving) return;
    setSaving(true);
    try {
      if (editing) {
        await updateTestimonial({ data: { id: editing.id, ...form } });
        toast.success("Testimonial updated");
      } else {
        await createTestimonial({ data: form });
        toast.success("Testimonial added");
      }
      setDialogOpen(false);
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(t: Testimonial) {
    if (!window.confirm(`Delete the testimonial from ${t.student_name}?`)) return;
    setBusyId(t.id);
    try {
      await deleteTestimonial({ data: { id: t.id } });
      toast.success("Testimonial deleted");
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onTogglePublish(t: Testimonial) {
    setBusyId(t.id);
    try {
      await setTestimonialPublished({
        data: { id: t.id, is_published: !t.is_published },
      });
      toast.success(t.is_published ? "Unpublished" : "Published");
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onMove(t: Testimonial, direction: -1 | 1) {
    if (!data) return;
    const idx = data.findIndex((x) => x.id === t.id);
    const swapIdx = idx + direction;
    if (idx < 0 || swapIdx < 0 || swapIdx >= data.length) return;
    const ids = data.map((x) => x.id);
    [ids[idx], ids[swapIdx]] = [ids[swapIdx]!, ids[idx]!];
    setBusyId(t.id);
    try {
      await reorderTestimonials({ data: { ids } });
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reorder failed");
    } finally {
      setBusyId(null);
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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Only published testimonials appear on the homepage, in this order.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="bg-accent text-accent-foreground shadow-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {isPending ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading testimonials…
          </div>
        ) : !data || data.length === 0 ? (
          <div className="bg-card shadow-soft rounded-2xl p-12 text-center">
            <p className="text-muted-foreground text-sm">
              No testimonials yet. Add your first one!
            </p>
          </div>
        ) : (
          data.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              className={cn(
                "bg-card shadow-soft flex flex-wrap items-center gap-4 rounded-2xl p-4 sm:p-5",
                !t.is_published && "opacity-60",
              )}
            >
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={i === 0 || busyId === t.id}
                  onClick={() => onMove(t, -1)}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={i === data.length - 1 || busyId === t.id}
                  onClick={() => onMove(t, 1)}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-sm font-bold">{t.student_name}</p>
                  <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    {t.course}
                  </span>
                  <Stars rating={t.rating} />
                </div>
                <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onTogglePublish(t)}
                  disabled={busyId === t.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors",
                    t.is_published
                      ? "bg-accent-soft text-accent-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {t.is_published ? (
                    <>
                      <Eye className="h-3.5 w-3.5" /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5" /> Hidden
                    </>
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Edit"
                  onClick={() => openEdit(t)}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete"
                  onClick={() => onDelete(t)}
                  disabled={busyId === t.id}
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm"
            onClick={() => !saving && setDialogOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card shadow-lift w-full max-w-lg rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => !saving && setDialogOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="t-name" className="mb-1.5 block text-sm font-semibold">
                    Student name
                  </label>
                  <input
                    id="t-name"
                    type="text"
                    value={form.student_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, student_name: e.target.value }))
                    }
                    className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <label htmlFor="t-course" className="mb-1.5 block text-sm font-semibold">
                    Course
                  </label>
                  <select
                    id="t-course"
                    value={form.course}
                    onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                    className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                  >
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="t-quote" className="mb-1.5 block text-sm font-semibold">
                    Quote
                  </label>
                  <textarea
                    id="t-quote"
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                    className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-sm font-semibold">Rating</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`${i} star${i > 1 ? "s" : ""}`}
                        onClick={() => setForm((f) => ({ ...f, rating: i }))}
                        className="p-1"
                      >
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            i <= form.rating
                              ? "fill-accent text-accent"
                              : "text-border hover:text-accent/50",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, is_published: e.target.checked }))
                    }
                    className="accent-accent h-4.5 w-4.5"
                  />
                  <span className="text-sm font-medium">
                    Published (visible on the homepage)
                  </span>
                </label>
              </div>

              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => !saving && setDialogOpen(false)}
                  className="text-muted-foreground hover:text-foreground rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving || !form.student_name.trim() || !form.quote.trim()}
                  className="bg-primary text-primary-foreground shadow-soft inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Add Testimonial"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
