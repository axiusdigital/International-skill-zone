import { Quote, Sparkles, Star } from "lucide-react";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { FadeIn } from "./motion-primitives";

export function PracticeQuote() {
  const texts = useSiteTexts();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="from-primary via-primary to-[oklch(0.2_0.05_259)] shadow-lift relative overflow-hidden rounded-3xl bg-gradient-to-br px-6 py-14 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
            {/* Decorative accents */}
            <div
              aria-hidden
              className="bg-accent/20 pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"
            />
            <div
              aria-hidden
              className="border-primary-foreground/10 pointer-events-none absolute inset-4 rounded-2xl border sm:inset-6"
            />
            <Quote
              aria-hidden
              className="text-primary-foreground/[0.05] pointer-events-none absolute -top-6 left-1/2 h-64 w-64 -translate-x-1/2 sm:h-72 sm:w-72"
              strokeWidth={0}
              fill="currentColor"
            />

            <span className="font-display border-accent/30 bg-accent/10 text-accent relative mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Words to Live By
            </span>

            <div className="relative mt-6 flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="fill-accent text-accent h-4 w-4" />
              ))}
            </div>

            <blockquote className="relative mt-7 md:mt-9">
              <p className="font-display text-primary-foreground text-2xl leading-tight font-black sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                {texts.quote_line1}
              </p>
              <p className="font-display mt-2 text-2xl leading-tight font-black sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                <span className="bg-accent text-primary rounded-lg px-3 py-1 shadow-md">
                  {texts.quote_highlight}
                </span>{" "}
                <span className="text-primary-foreground">{texts.quote_line3}</span>
              </p>
            </blockquote>

            <div className="relative mx-auto mt-9 flex items-center justify-center gap-3 sm:mt-11">
              <span className="bg-primary-foreground/15 h-px w-14 sm:w-20" />
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              <span className="bg-primary-foreground/15 h-px w-14 sm:w-20" />
            </div>

            <figcaption className="relative mt-7 flex flex-col items-center gap-1 sm:mt-8">
              <span className="from-accent to-accent/70 shadow-gold font-display text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-black sm:h-16 sm:w-16 sm:text-xl">
                PU
              </span>
              <p className="font-display text-primary-foreground mt-3 text-lg font-bold sm:text-xl">
                {texts.quote_author}
              </p>
              <p className="text-accent text-xs font-bold tracking-wide uppercase sm:text-sm">
                {texts.quote_role}
              </p>
              <p className="text-primary-foreground/55 mt-0.5 text-xs sm:text-sm">
                {texts.quote_specialty}
              </p>
            </figcaption>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
