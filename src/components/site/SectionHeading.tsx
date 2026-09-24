import { FadeIn } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <FadeIn
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <span className="font-display border-accent/30 bg-accent/10 text-accent inline-block rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display mt-4 text-3xl font-bold text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight",
          dark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            dark ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
