import { SanityImage } from "@/components/ui/SanityImage";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { MediaModule } from "@/sanity/lib/types";

export function Media({
  module,
  documentId,
}: {
  module: MediaModule;
  documentId: string;
}) {
  const root = `modules[_key=="${module._key}"]`;
  const path = (field: string) => `${root}.${field}`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <div
        data-sanity={dataAttr({
          id: documentId,
          type: "page",
          path: path(module.mediaType === "video" ? "video" : "image"),
        })}
        className="relative aspect-video w-full bg-black/5"
      >
        {module.mediaType === "image" && module.image && (
          <SanityImage image={module.image} alt={module.caption ?? ""} className="object-cover" />
        )}
        {module.mediaType === "video" && (
          <VideoEmbed
            video={module.video}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {module.caption && (
        <p
          data-sanity={dataAttr({ id: documentId, type: "page", path: path("caption") })}
          className="mt-4 text-sm opacity-70"
        >
          {module.caption}
        </p>
      )}
    </section>
  );
}
