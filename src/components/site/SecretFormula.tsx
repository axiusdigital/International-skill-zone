import { Lock, Play, Star } from "lucide-react";
import {
  SECRET_FORMULA_LEARN_ITEMS,
  SECRET_FORMULA_STATS,
  SECRET_FORMULA_STEPS,
  YOUTUBE_DEMO_WATCH_URL,
  YOUTUBE_GUIDE_VIDEO_ID,
} from "@/lib/content";
import { getYoutubeWatchUrl } from "@/lib/youtube";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import { YoutubeVideoCard } from "./YoutubeVideoCard";
import { cn } from "@/lib/utils";

const watchUrl = getYoutubeWatchUrl(YOUTUBE_GUIDE_VIDEO_ID, YOUTUBE_DEMO_WATCH_URL);

export function SecretFormula() {
  return (
    <section id="secret-formula" className="bg-secondary/40 scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top banner — no logo, badge on the right */}
        <FadeIn className="mb-0 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="hidden flex-1 sm:block" aria-hidden />

          <div className="bg-primary shadow-lift relative rounded-lg px-8 py-4 text-center sm:px-12 sm:py-5">
            <p className="font-display text-sm font-bold tracking-[0.25em] uppercase sm:text-base">
              <span className="text-accent">Power</span>{" "}
              <span className="text-primary-foreground">Secret Formula</span>
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <Star className="fill-accent text-accent h-4 w-4" />
              <p className="font-display text-primary-foreground text-2xl font-black sm:text-3xl">
                90 Out of 90
              </p>
              <Star className="fill-accent text-accent h-4 w-4" />
            </div>
          </div>

          <div className="border-accent bg-primary relative flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4 text-center shadow-lg sm:h-28 sm:w-28">
            <div
              aria-hidden
              className="border-accent/40 absolute inset-1 rounded-full border border-dashed"
            />
            <p className="text-accent font-display text-[9px] font-bold tracking-wider uppercase sm:text-[10px]">
              PTE
            </p>
            <p className="text-primary-foreground font-display text-lg font-black sm:text-xl">
              90/90
            </p>
            <p className="text-primary-foreground/80 text-[8px] font-semibold uppercase sm:text-[9px]">
              Expert
            </p>
          </div>
        </FadeIn>

        {/* Main content */}
        <div className="-mt-4 grid items-start gap-10 lg:grid-cols-2 lg:-mt-10 lg:gap-14">
          <FadeIn className="-mt-10 lg:-mt-16">
            <h2 className="font-display text-primary text-2xl leading-tight font-black uppercase sm:text-3xl lg:text-4xl">
              Discover How You Can{" "}
              <span className="text-accent">Achieve Your Desired PTE Score</span>
            </h2>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3].map((i) => (
                <Star key={i} className="fill-accent text-accent h-4 w-4" />
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3">
              <span className="bg-primary text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Play className="h-5 w-5 fill-current" />
              </span>
              <div>
                <p className="font-display text-primary text-base font-bold sm:text-lg">
                  Watch Our Complete Video Guide
                </p>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  All the answers you need are in our video. Watch now and clear all your doubts!
                </p>
              </div>
            </div>

            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-primary-foreground shadow-lift hover:shadow-glow group mt-6 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 sm:text-base"
            >
              <Play className="h-5 w-5 fill-current" />
              Watch the Video Now
            </a>

            <a
              href={YOUTUBE_DEMO_WATCH_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary mt-4 flex items-center gap-2 text-sm transition-colors"
            >
              <Lock className="h-4 w-4" />
              Link to Our YouTube Channel
            </a>

            <YoutubeVideoCard
              videoId={YOUTUBE_GUIDE_VIDEO_ID}
              fallbackWatchUrl={YOUTUBE_DEMO_WATCH_URL}
              title="Watch our complete video guide on YouTube"
              className="mt-10"
            />
          </FadeIn>

          {/* Inside you'll learn */}
          <FadeIn delay={0.1} className="mt-8 sm:mt-10 lg:mt-16">
            <div className="relative">
              <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-primary text-primary-foreground font-display inline-block rounded-t-lg px-5 py-2 text-xs font-bold tracking-wide uppercase sm:text-sm">
                  Inside You&apos;ll Learn:
                </span>
              </div>
              <div className="border-primary/25 shadow-card rounded-2xl border-2 bg-white pt-8 pb-2">
                {SECRET_FORMULA_LEARN_ITEMS.map((item, i) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 sm:px-6",
                      i < SECRET_FORMULA_LEARN_ITEMS.length - 1 && "border-border border-b",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                        item.iconBg,
                      )}
                    >
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="text-foreground text-sm font-semibold sm:text-base">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 3 easy steps */}
        <FadeIn delay={0.15} className="mt-16 md:mt-20">
          <div className="text-center">
            <span className="bg-primary text-primary-foreground font-display inline-block rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide uppercase">
              Just 3 Easy Steps
            </span>
          </div>
          <StaggerGroup className="mt-8  grid gap-6 md:grid-cols-3">
            {SECRET_FORMULA_STEPS.map((step, i) => (
              <StaggerItem key={step.step}>
                <div className="relative flex flex-col items-center text-center">
                  {i < SECRET_FORMULA_STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="bg-primary absolute  top-10 left-[calc(50%+3rem)] hidden h-0.5 w-[calc(100%-6rem)] md:block"
                    />
                  )}
                  <span className="font-display text-primary/30 text-4xl mb-2 font-black">
                    {step.step}
                  </span>
                  <span
                    className={cn(
                      "-mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md",
                      step.iconBg,
                    )}
                  >
                    <step.icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <p className="font-display text-primary text-base font-bold">{step.title}</p>
                  <p className="text-muted-foreground mt-1 max-w-xs text-sm">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </FadeIn>

        {/* Stats bar */}
        <FadeIn delay={0.2} className="mt-14 md:mt-16">
          <div className="glass-strong shadow-card grid grid-cols-2 divide-y divide-border overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {SECRET_FORMULA_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 px-4 py-5 text-center"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white",
                    stat.iconBg,
                  )}
                >
                  <stat.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="text-foreground text-xs font-semibold sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Tagline bar */}
        <FadeIn delay={0.25} className="mt-10">
          <div className="bg-primary shadow-lift flex items-center justify-center gap-3 rounded-2xl px-6 py-5 text-center">
            <Star className="fill-accent text-accent hidden h-4 w-4 sm:block" />
            <p
              className="text-primary-foreground text-xl sm:text-2xl"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Your Target Score.{" "}
              <span className="text-accent italic">Our Strategy.</span> Your Success
            </p>
            <Star className="fill-accent text-accent hidden h-4 w-4 sm:block" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
