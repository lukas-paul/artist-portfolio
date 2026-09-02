import { HeroContent, usableLink } from "@/components/modules/HeroContent";
import { HeroSlider } from "@/components/modules/HeroSlider";
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
  const slides = module.slides ?? [];
  const hasImages = module.backgroundType === "image" && slides.length > 0;
  const isSlider = hasImages && slides.length > 1;
  const hasMedia =
    hasImages ||
    (module.backgroundType === "video" && hasPlayableVideo(module.backgroundVideo));
  const root = `modules[_key=="${module._key}"]`;
  const sanity = (path: string) => dataAttr({ id: documentId, type: "page", path });

  // Single slide (or a static image): resolve its fields, falling back to the module.
  const single = hasImages && !isSlider ? slides[0] : null;

  return (
    <section
      data-sanity={sanity(root)}
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-black text-white"
    >
      {isSlider && (
        <HeroSlider
          slides={slides}
          fallbackHeadline={module.headline}
          fallbackText={module.text}
          fallbackLink={module.link}
          documentId={documentId}
          moduleKey={module._key}
        />
      )}
      {single && (
        <SanityImage
          image={single.image}
          alt={single.headline || module.headline}
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
      {hasMedia && !isSlider && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      )}

      {!isSlider && (
        <HeroContent
          headline={single?.headline || module.headline}
          text={single?.text || module.text}
          link={usableLink(single?.link) ? single?.link : module.link}
          headlineDataSanity={sanity(
            single ? `${root}.slides[_key=="${single._key}"].headline` : `${root}.headline`
          )}
          textDataSanity={sanity(
            single ? `${root}.slides[_key=="${single._key}"].text` : `${root}.text`
          )}
        />
      )}
    </section>
  );
}
