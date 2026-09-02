import { CmsLink } from "@/components/ui/CmsLink";
import { SanityImage } from "@/components/ui/SanityImage";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { HeroModule } from "@/sanity/lib/types";
import { hasPlayableVideo } from "@/sanity/lib/videoEmbed";

export function Hero({
  module,
  documentId,
}: {
  module: HeroModule;
  documentId: string;
}) {
  const hasMedia =
    (module.backgroundType === "image" && module.backgroundImage) ||
    (module.backgroundType === "video" && hasPlayableVideo(module.backgroundVideo));
  const root = `modules[_key=="${module._key}"]`;
  const path = (field: string) => `${root}.${field}`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-black text-white"
    >
      {module.backgroundType === "image" && module.backgroundImage && (
        <SanityImage
          image={module.backgroundImage}
          alt={module.headline}
          className="object-cover opacity-80"
          priority
        />
      )}
      {module.backgroundType === "video" && (
        <VideoEmbed
          video={module.backgroundVideo}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      )}
      {hasMedia && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      )}

      <div className="relative mx-auto w-full max-w-5xl px-6 py-16">
        <h1
          data-sanity={dataAttr({ id: documentId, type: "page", path: path("headline") })}
          className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {module.headline}
        </h1>
        {module.text && (
          <p
            data-sanity={dataAttr({ id: documentId, type: "page", path: path("text") })}
            className="mt-4 max-w-xl text-lg opacity-80"
          >
            {module.text}
          </p>
        )}
        {module.link && (
          <CmsLink
            link={module.link}
            className="mt-8 inline-block border border-white px-6 py-3 text-sm hover:bg-white hover:text-black"
          />
        )}
      </div>
    </section>
  );
}
