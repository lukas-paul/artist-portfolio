import { PortableTextContent } from "@/components/ui/PortableTextContent";
import { SanityImage } from "@/components/ui/SanityImage";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { TextMediaModule } from "@/sanity/lib/types";

export function TextMedia({
  module,
  documentId,
}: {
  module: TextMediaModule;
  documentId: string;
}) {
  const mediaFirst = module.mediaPosition !== "right";
  const root = `modules[_key=="${module._key}"]`;
  const path = (field: string) => `${root}.${field}`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
        <div className={mediaFirst ? "order-1" : "order-2"}>
          <div
            data-sanity={dataAttr({
              id: documentId,
              type: "page",
              path: path(module.mediaType === "video" ? "video" : "image"),
            })}
            className="relative aspect-[4/3] w-full bg-black/5"
          >
            {module.mediaType === "image" && module.image && (
              <SanityImage image={module.image} alt="" className="object-cover" />
            )}
            {module.mediaType === "video" && (
              <VideoEmbed
                video={module.video}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </div>
        <div className={mediaFirst ? "order-2" : "order-1"}>
          <PortableTextContent
            value={module.content}
            dataSanity={dataAttr({ id: documentId, type: "page", path: path("content") })}
          />
        </div>
      </div>
    </section>
  );
}
