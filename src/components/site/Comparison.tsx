import { Fragment } from "react";
import { Check, ChevronRight, School, X } from "lucide-react";
import {
  COMPARISON_OTHERS_LABEL,
  COMPARISON_OTHERS_SUBTITLE,
  COMPARISON_ROWS,
  COMPARISON_US_LABEL,
  COMPARISON_US_SUBTITLE,
  COMPLETE_SYSTEM_STEPS,
} from "@/lib/content";
import { FadeIn } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function Comparison() {
  return (
    <section id="how-we-differ" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center md:mb-14">
          <p className="font-display text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">
            How Are We Different?
          </p>
          <h2 className="font-display text-primary mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            Why{" "}
            <span className="text-gradient-gold">International Skill Zone?</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base md:text-lg">
            More Than Just Classes — A Complete Score-Focused System.
          </p>
        </FadeIn>

        <div className="relative">
          {/* VS badge */}
          <div className="absolute top-[4.5rem] left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="bg-primary text-primary-foreground font-display flex h-14 w-14 items-center justify-center rounded-full text-lg font-black shadow-lift ring-4 ring-white">
              VS
            </span>
          </div>

          {/* Mobile: stacked columns */}
          <div className="shadow-lift overflow-hidden rounded-3xl lg:hidden">
            <div className="bg-muted/60">
              <div className="bg-[oklch(0.42_0.03_260)] flex h-36 items-center justify-center px-5 py-5 text-center">
                <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <School className="text-primary-foreground h-5 w-5" />
                  </span>
                  <p className="font-display text-primary-foreground text-sm font-black tracking-wide uppercase">
                    {COMPARISON_OTHERS_LABEL}
                  </p>
                  <p className="text-primary-foreground/70 text-xs">{COMPARISON_OTHERS_SUBTITLE}</p>
                </div>
              </div>
              <ul>
                {COMPARISON_ROWS.map((row, i) => (
                  <li
                    key={row.others}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5",
                      i < COMPARISON_ROWS.length - 1 && "border-b border-white/50",
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                      <X className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/80 flex-1 text-xs font-medium">{row.others}</span>
                    <row.othersIcon className="text-muted-foreground/50 h-4 w-4 shrink-0" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center border-y border-white/20 bg-white py-3">
              <span className="bg-primary text-primary-foreground font-display flex h-12 w-12 items-center justify-center rounded-full text-base font-black shadow-lift">
                VS
              </span>
            </div>

            <div className="from-primary to-primary-light bg-gradient-to-br">
              <div className="flex h-36 items-center justify-center border-b border-white/10 px-5 py-5 text-center">
                <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
                  <span className="h-10 w-10" aria-hidden />
                  <p className="font-display text-primary-foreground text-sm font-black tracking-wide uppercase">
                    {COMPARISON_US_LABEL}
                  </p>
                  <p className="text-primary-foreground/75 text-xs">{COMPARISON_US_SUBTITLE}</p>
                </div>
              </div>
              <ul>
                {COMPARISON_ROWS.map((row, i) => (
                  <li
                    key={row.us}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5",
                      i < COMPARISON_ROWS.length - 1 && "border-b border-white/10",
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-primary-foreground flex-1 text-xs font-semibold">{row.us}</span>
                    <row.usIcon className="text-accent h-4 w-4 shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: row-synced grid — each row shares the same height */}
          <div
            className="shadow-lift hidden overflow-hidden rounded-3xl lg:grid lg:grid-cols-2"
            style={{
              gridTemplateRows: `9rem repeat(${COMPARISON_ROWS.length}, minmax(4rem, auto))`,
            }}
          >
            {/* Headers — row 1 */}
            <div className="bg-[oklch(0.42_0.03_260)] flex items-center justify-center px-6 py-4 text-center">
              <div className="flex max-w-xs flex-col items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <School className="text-primary-foreground h-5 w-5" />
                </span>
                <p className="font-display text-primary-foreground text-base font-black tracking-wide uppercase">
                  {COMPARISON_OTHERS_LABEL}
                </p>
                <p className="text-primary-foreground/70 text-sm">{COMPARISON_OTHERS_SUBTITLE}</p>
              </div>
            </div>
            <div className="from-primary to-primary-light flex items-center justify-center border-b border-white/10 bg-gradient-to-br px-6 py-4 text-center">
              <div className="flex max-w-xs flex-col items-center gap-2">
                <span className="h-10 w-10" aria-hidden />
                <p className="font-display text-primary-foreground text-base font-black tracking-wide uppercase">
                  {COMPARISON_US_LABEL}
                </p>
                <p className="text-primary-foreground/75 text-sm">{COMPARISON_US_SUBTITLE}</p>
              </div>
            </div>

            {/* Comparison rows — shared row heights */}
            {COMPARISON_ROWS.map((row, i) => (
              <Fragment key={row.us}>
                <div
                  className={cn(
                    "bg-muted/60 flex items-center gap-3 px-6 py-4",
                    i < COMPARISON_ROWS.length - 1 && "border-b border-white/50",
                  )}
                  style={{ gridRow: i + 2 }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/80 flex-1 text-sm font-medium">{row.others}</span>
                  <span className="text-muted-foreground/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/60">
                    <row.othersIcon className="h-4 w-4" />
                  </span>
                </div>
                <div
                  className={cn(
                    "from-primary to-primary-light flex items-center gap-3 bg-gradient-to-br px-6 py-4",
                    i < COMPARISON_ROWS.length - 1 && "border-b border-white/10",
                  )}
                  style={{ gridRow: i + 2 }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-primary-foreground flex-1 text-sm font-semibold">{row.us}</span>
                  <span className="bg-accent/20 text-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <row.usIcon className="h-4 w-4" />
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Our Complete System */}
        <FadeIn delay={0.15} className="mt-14 md:mt-16">
          <h3 className="font-display text-primary text-center text-xl font-black uppercase sm:text-2xl">
            Our Complete System
          </h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {COMPLETE_SYSTEM_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md sm:h-16 sm:w-16",
                      step.color,
                    )}
                  >
                    <step.icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                  </span>
                  <p className="text-foreground max-w-[5.5rem] text-[10px] font-bold tracking-wide uppercase sm:max-w-none sm:text-xs">
                    {step.label}
                  </p>
                </div>
                {i < COMPLETE_SYSTEM_STEPS.length - 1 && (
                  <ChevronRight className="text-muted-foreground/40 hidden h-5 w-5 shrink-0 sm:block" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
