export type YoutubeThumbnailQuality = "maxres" | "hq" | "mq";

const THUMBNAIL_FILES: Record<YoutubeThumbnailQuality, string> = {
  maxres: "maxresdefault",
  hq: "hqdefault",
  mq: "mqdefault",
};

export function getYoutubeWatchUrl(videoId: string, fallbackUrl?: string) {
  return videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : (fallbackUrl ?? "https://www.youtube.com");
}

export function getYoutubeThumbnailUrl(
  videoId: string,
  quality: YoutubeThumbnailQuality = "maxres",
) {
  return `https://img.youtube.com/vi/${videoId}/${THUMBNAIL_FILES[quality]}.jpg`;
}

export function getYoutubeThumbnailFallbacks(videoId: string) {
  return (["maxres", "hq", "mq"] as const).map((quality) =>
    getYoutubeThumbnailUrl(videoId, quality),
  );
}
