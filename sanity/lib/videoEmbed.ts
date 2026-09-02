import type { VideoSource } from "./types";

export function hasPlayableVideo(video?: VideoSource | null): boolean {
  if (!video) return false;
  if (video.sourceType === "upload") return Boolean(video.file?.asset?.url);
  if (video.sourceType === "url") return Boolean(video.url);
  return false;
}

export function getVideoEmbedUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);

  const youTubeId =
    host === "youtu.be"
      ? segments[0]
      : host === "youtube.com" && parsed.pathname === "/watch"
        ? parsed.searchParams.get("v")
        : host === "youtube.com" && segments[0] === "shorts"
          ? segments[1]
          : host === "youtube.com" && segments[0] === "embed"
            ? segments[1]
            : null;

  if (youTubeId) {
    return `https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&playsinline=1`;
  }

  const vimeoId =
    host === "vimeo.com"
      ? segments[0]
      : host === "player.vimeo.com" && segments[0] === "video"
        ? segments[1]
        : null;

  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`;
  }

  return null;
}
