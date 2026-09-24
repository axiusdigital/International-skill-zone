import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import resultPlaceholder from "@/assets/Result.png";
import { getPublishedResults } from "@/lib/results.functions";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const PLACEHOLDER_RESULTS = Array.from({ length: 7 }, (_, i) => ({
  id: `placeholder-${i}`,
  image: resultPlaceholder,
  alt: `Student PTE score report ${i + 1}`,
}));

const AUTOPLAY_MS = 2600;
const VISIBLE_RANGE = 2;

function useCardWidth() {
  const [width, setWidth] = useState(300);
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) setWidth(160);
      else if (vw < 1024) setWidth(230);
      else setWidth(300);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export function ResultsShowcase() {
  const { data } = useQuery({
    queryKey: ["results", "published"],
    queryFn: () => getPublishedResults(),
    staleTime: 60_000,
  });

  const RESULTS =
    data && data.length > 0
      ? data.map((r) => ({ id: r.id, image: r.image_url, alt: r.alt_text || "Student PTE score report" }))
      : PLACEHOLDER_RESULTS;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = RESULTS.length;
  const cardW = useCardWidth();
  const cardH = cardW / 2;

  const goTo = (i: number) => setActive(((i % total) + total) % total);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  return (
    <section
      className="isolate scroll-mt-24 overflow-hidden py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Scorecards"
          title="Results That Speak For Themselves"
          description="A live look at the score reports our students walk away with."
        />

        <div
          className="relative mx-auto"
          style={{ height: cardH + cardH * 0.35 * Math.pow(VISIBLE_RANGE, 1.5) + 24 }}
        >
          {RESULTS.map((result, i) => {
            let offset = i - active;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            const hidden = abs > VISIBLE_RANGE;

            const x = offset * cardW * 0.74;
            const y = cardH * 0.35 * Math.pow(abs, 1.5);
            const rotate = offset * 11;
            const scale = 1 - abs * 0.07;
            const opacity = hidden ? 0 : 1 - abs * 0.14;

            return (
              <motion.button
                key={result.id}
                type="button"
                aria-label={`Show result ${i + 1}`}
                onClick={() => goTo(i)}
                initial={false}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{ zIndex: 100 - abs, pointerEvents: hidden ? "none" : "auto", width: cardW }}
                className="glass shadow-lift border-border absolute top-0 left-1/2 cursor-pointer overflow-hidden rounded-md border"
              >
                <img
                  src={result.image}
                  alt={result.alt}
                  className="aspect-[2/1] w-full object-cover"
                  loading={abs <= 1 ? "eager" : "lazy"}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous result"
            onClick={prev}
            className="glass cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {RESULTS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                aria-label={`Go to result ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === active ? "bg-accent w-6" : "bg-foreground/25 hover:bg-foreground/50 w-2",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next result"
            onClick={next}
            className="glass cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
