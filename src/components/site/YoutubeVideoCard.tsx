import { useState } from "react";
import { BookOpen, GraduationCap, Laptop, Play } from "lucide-react";
import {
  getYoutubeThumbnailFallbacks,
  getYoutubeWatchUrl,
} from "@/lib/youtube";
import { cn } from "@/lib/utils";

type YoutubeVideoCardProps = {
  videoId: string;
  fallbackWatchUrl?: string;
  title?: string;
  className?: string;
};

export function YoutubeVideoCard({
  videoId,
  fallbackWatchUrl,
  title = "Watch on YouTube",
  className,
}: YoutubeVideoCardProps) {
  const watchUrl = getYoutubeWatchUrl(videoId, fallbackWatchUrl);
  const thumbnails = videoId ? getYoutubeThumbnailFallbacks(videoId) : [];
  const [thumbIndex, setThumbIndex] = useState(0);
  const thumbnailSrc = thumbnails[thumbIndex];

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className={cn("group relative block max-w-sm", className)}
    >
      <div className="bg-primary/5 border-primary/10 relative rounded-2xl border p-6 transition-shadow duration-300 group-hover:shadow-lift">
        <div className="bg-primary shadow-lift relative mx-auto aspect-video w-full max-w-[320px] overflow-hidden rounded-xl">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-center"
              loading="lazy"
              onError={() => {
                setThumbIndex((current) =>
                  current < thumbnails.length - 1 ? current + 1 : current,
                );
              }}
            />
          ) : (
            <div className="from-primary to-primary-light absolute inset-0 bg-gradient-to-br" />
          )}

          <div className="absolute inset-0 bg-primary/25 transition-colors duration-300 group-hover:bg-primary/35" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-accent shadow-gold flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
              <Play className="text-accent-foreground h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
          </div>

          <Laptop className="text-primary-foreground/25 pointer-events-none absolute right-2 bottom-2 h-14 w-14 sm:h-16 sm:w-16" />
        </div>

        <GraduationCap className="text-accent pointer-events-none absolute -top-3 -right-2 h-10 w-10 rotate-12 drop-shadow-md" />
        <div className="pointer-events-none absolute -bottom-2 left-4 flex gap-1">
          {[1, 2, 3].map((i) => (
            <BookOpen
              key={i}
              className={cn(
                "text-primary drop-shadow-sm",
                i === 1 && "h-7 w-7",
                i === 2 && "h-8 w-8",
                i === 3 && "h-6 w-6",
              )}
              style={{ transform: `rotate(${(i - 2) * 8}deg)` }}
            />
          ))}
        </div>
      </div>
    </a>
  );
}
