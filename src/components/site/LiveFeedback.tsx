import { Youtube } from "lucide-react";
import { YOUTUBE_LIVE_FEEDBACK_VIDEO_ID } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { getYoutubeWatchUrl } from "@/lib/youtube";
import { FadeIn } from "./motion-primitives";

const watchUrl = getYoutubeWatchUrl(YOUTUBE_LIVE_FEEDBACK_VIDEO_ID);

export function LiveFeedback() {
  const texts = useSiteTexts();

  return (
    <section id="live-feedback" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="font-display border-accent/30 bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            <Youtube className="h-3.5 w-3.5" />
            {texts.live_feedback_eyebrow}
          </span>
          <h2 className="font-display text-primary mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
            {texts.live_feedback_title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base leading-relaxed">
            {texts.live_feedback_description}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="border-primary/10 shadow-lift overflow-hidden rounded-2xl border-2 bg-black">
            <iframe
              title="Live Student Feedback"
              src={`https://www.youtube.com/embed/${YOUTUBE_LIVE_FEEDBACK_VIDEO_ID}`}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-6 text-center">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-accent inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <Youtube className="h-4 w-4 text-red-600" />
            Watch more student reviews on YouTube
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
