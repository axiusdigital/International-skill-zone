import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Eye, EyeOff, ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import type { Result } from "@/lib/types";
import { deleteResult, listAllResults, updateResult, uploadResult } from "@/lib/results.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/results")({
  head: () => ({
    meta: [
      { title: "Manage Results — Skill Zone Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResultsAdmin,
});

const MAX_FILE_BYTES = 5 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function ResultsAdmin() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "results"],
    queryFn: () => listAllResults(),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin", "results"] }),
      queryClient.invalidateQueries({ queryKey: ["results", "published"] }),
    ]);

  async function onFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} isn't an image`);
          continue;
        }
        if (file.size > MAX_FILE_BYTES) {
          toast.error(`${file.name} is larger than 5MB`);
          continue;
        }
        const fileBase64 = await fileToBase64(file);
        await uploadResult({
          data: {
            fileBase64,
            fileName: file.name,
            contentType: file.type,
            altText: "",
          },
        });
      }
      toast.success("Result image(s) uploaded");
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function onDelete(r: Result) {
    if (!window.confirm("Delete this result image?")) return;
    setBusyId(r.id);
    try {
      await deleteResult({ data: { id: r.id } });
      toast.success("Result deleted");
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onTogglePublish(r: Result) {
    setBusyId(r.id);
    try {
      await updateResult({ data: { id: r.id, is_published: !r.is_published } });
      toast.success(r.is_published ? "Unpublished" : "Published");
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onAltChange(r: Result, alt_text: string) {
    try {
      await updateResult({ data: { id: r.id, alt_text } });
      await invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
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
          <h1 className="font-display text-2xl font-bold">Result Pictures</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Only published images appear in the "Results That Speak For Themselves" carousel.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-accent text-accent-foreground shadow-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {uploading ? "Uploading…" : "Add Result Picture"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFilesSelected(e.target.files)}
        />
      </div>

      <div className="mt-6">
        {isPending ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading results…
          </div>
        ) : !data || data.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-border bg-card hover:border-accent hover:bg-accent/5 flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-14 text-center transition-colors"
          >
            <UploadCloud className="text-muted-foreground h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              No result pictures yet. Click to upload your first one.
            </p>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((r) => (
              <motion.div
                key={r.id}
                layout
                className={cn(
                  "bg-card shadow-soft overflow-hidden rounded-2xl",
                  !r.is_published && "opacity-60",
                )}
              >
                <div className="bg-muted aspect-[2/1] w-full overflow-hidden">
                  <img src={r.image_url} alt={r.alt_text} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2.5 p-3">
                  <input
                    type="text"
                    defaultValue={r.alt_text}
                    placeholder="Description (alt text)"
                    onBlur={(e) => {
                      if (e.target.value !== r.alt_text) onAltChange(r, e.target.value);
                    }}
                    className="border-input bg-background focus:border-accent focus:ring-accent/30 w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:ring-2"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onTogglePublish(r)}
                      disabled={busyId === r.id}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                        r.is_published
                          ? "bg-accent-soft text-accent-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {r.is_published ? (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Live
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hidden
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={() => onDelete(r)}
                      disabled={busyId === r.id}
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
