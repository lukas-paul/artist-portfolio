import { getVideoEmbedUrl } from "@/sanity/lib/videoEmbed";
import type { VideoSource } from "@/sanity/lib/types";

export function VideoEmbed({
  video,
  className,
}: {
  video?: VideoSource | null;
  className?: string;
}) {
  if (!video) return null;

  if (video.sourceType === "upload" && video.file?.asset?.url) {
    return (
      <video
        src={video.file.asset.url}
        className={className}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  if (video.sourceType === "url" && video.url) {
    const embedUrl = getVideoEmbedUrl(video.url);
    if (!embedUrl) return null;

    return (
      <iframe
        src={embedUrl}
        className={className}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    );
  }

  return null;
}
