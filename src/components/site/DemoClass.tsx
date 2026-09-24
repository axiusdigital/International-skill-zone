import { ArrowDown, Star, Youtube } from "lucide-react";
import {
  DEMO_CLASS_FEATURES,
  YOUTUBE_DEMO_VIDEO_ID,
  YOUTUBE_DEMO_WATCH_URL,
} from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import { cn } from "@/lib/utils";

const watchUrl = YOUTUBE_DEMO_VIDEO_ID
  ? `https://www.youtube.com/watch?v=${YOUTUBE_DEMO_VIDEO_ID}`
  : YOUTUBE_DEMO_WATCH_URL;

export function DemoClass() {
  const texts = useSiteTexts();

  return (
    <section id="demo-class" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: copy + video */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <p
              className="text-primary text-2xl sm:text-3xl"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Start Here! →
            </p>
            <h2 className="font-display text-primary mt-3 text-2xl font-black tracking-wide uppercase sm:text-3xl lg:text-4xl">
              Watch Our Free Demo Class
            </h2>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="fill-accent text-accent h-5 w-5" />
              ))}
            </div>
            <div className="bg-primary text-primary-foreground mt-6 inline-block rounded-sm px-6 py-3 text-sm font-bold shadow-md sm:text-base">
              {texts.demo_class_ribbon}
            </div>
            <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed">
              {texts.demo_class_description}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="shadow-lift border-border overflow-hidden rounded-2xl border bg-black">
              {YOUTUBE_DEMO_VIDEO_ID ? (
                <iframe
                  title="PTE Demo Class"
                  src={`https://www.youtube.com/embed/${YOUTUBE_DEMO_VIDEO_ID}`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="from-primary to-primary-light relative flex aspect-video w-full flex-col items-center justify-center bg-gradient-to-br px-6 text-center"
                >
                  <span className="bg-accent/20 text-accent mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Youtube className="h-8 w-8" />
                  </span>
                  <p className="font-display text-primary-foreground text-xl font-bold sm:text-2xl">
                    PTE Demo Class
                  </p>
                  <p className="text-primary-foreground/70 mt-2 text-sm">
                    Tap to watch on YouTube
                  </p>
                </a>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Feature panel */}
        <FadeIn delay={0.15} className="relative mt-16 md:mt-20">
          <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-primary text-primary-foreground font-display inline-block rounded-t-xl px-6 py-2.5 text-xs font-bold tracking-wide uppercase sm:text-sm">
              Join Our Free Demo Class &amp; Check
            </span>
          </div>

          <div className="border-primary/20 shadow-card rounded-2xl border-2 bg-white px-4 pt-10 pb-8 sm:px-8 sm:pt-12">
            <StaggerGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {DEMO_CLASS_FEATURES.map((feature) => (
                <StaggerItem key={feature.label}>
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={cn(
                        "mb-3 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md sm:h-16 sm:w-16",
                        feature.circle,
                      )}
                    >
                      <feature.icon className="h-7 w-7" strokeWidth={1.75} />
                    </span>
                    <p className="text-foreground text-xs leading-snug font-semibold sm:text-sm">
                      {feature.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-2">
                <Youtube className="h-6 w-6 text-red-600" />
                <p className="font-display text-primary text-sm font-bold tracking-wide uppercase sm:text-base">
                  Click the button to
                </p>
              </div>
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-primary-foreground shadow-lift hover:shadow-glow inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 sm:text-base"
              >
                Watch Demo Class on YouTube
              </a>
              <span className="bg-primary text-primary-foreground hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex">
                <ArrowDown className="h-5 w-5" />
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
