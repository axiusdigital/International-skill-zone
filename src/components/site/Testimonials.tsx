import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/testimonials.functions";
import { SectionHeading } from "./SectionHeading";
import { FadeIn } from "./motion-primitives";
import { cn } from "@/lib/utils";

const AVATAR_GRADIENTS = [
  "from-accent to-orange-400",
  "from-neon to-blue-400",
  "from-accent to-neon",
  "from-primary-light to-neon",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= rating ? "fill-accent text-accent" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { data: testimonials } = useSuspenseQuery({
    queryKey: ["testimonials", "published"],
    queryFn: () => getPublishedTestimonials(),
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Real Results, Real Students"
            title="Success Stories From Our Students"
            description="Verified results and reviews from students who hit their target scores."
          />
          <FadeIn className="mb-12 hidden gap-3 md:mb-16 md:flex">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev && !emblaApi?.internalEngine?.().options.loop}
              className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => emblaApi?.scrollNext()}
              className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6 py-4">
              {testimonials.map((t, i) => (
                <figure
                  key={t.id}
                  className="glass hover:shadow-glow-sm hover:border-accent/30 relative flex min-w-0 flex-[0_0_100%] flex-col overflow-hidden rounded-2xl transition-all duration-300 select-none sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  {/* Result card header */}
                  <div className="from-primary to-primary-light relative flex items-center gap-4 bg-gradient-to-br px-6 py-5">
                    <div
                      className={cn(
                        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-lg",
                        AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                      )}
                    >
                      {getInitials(t.student_name)}
                      <span className="bg-accent absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-primary">
                        <BadgeCheck className="text-accent-foreground h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-primary-foreground truncate text-base font-bold">
                        {t.student_name}
                      </p>
                      <span className="bg-accent/20 text-accent mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                        {t.course}
                      </span>
                    </div>
                    <Quote className="text-primary-foreground/15 absolute top-3 right-4 h-10 w-10" aria-hidden />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <Stars rating={t.rating} />
                    <blockquote className="text-foreground/85 mt-4 flex-1 text-sm leading-relaxed">
                      “{t.quote}”
                    </blockquote>
                    <p className="border-border mt-6 border-t pt-3 text-xs font-semibold tracking-wide text-accent uppercase">
                      ✓ Verified Result
                    </p>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
