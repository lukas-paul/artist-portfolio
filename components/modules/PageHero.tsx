import { SanityImage } from "@/components/ui/SanityImage";
import { HeadlineHero } from "@/components/modules/HeadlineHero";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { PageHeroModule } from "@/sanity/lib/types";

export function PageHero({
  module,
  documentId,
}: {
  module: PageHeroModule;
  documentId: string;
}) {
  const root = `modules[_key=="${module._key}"]`;
  const rootAttr = dataAttr({ id: documentId, type: "page", path: root });
  const headlineAttr = dataAttr({
    id: documentId,
    type: "page",
    path: `${root}.headline`,
  });

  if (!module.image) {
    return (
      <HeadlineHero
        headline={module.headline}
        dataSanityRoot={rootAttr}
        dataSanityHeadline={headlineAttr}
      />
    );
  }

  return (
    <section data-sanity={rootAttr} className="mx-auto max-w-5xl px-6">
      <div className="relative flex min-h-[60vh] items-end justify-start overflow-hidden bg-black text-white">
        <SanityImage
          image={module.image}
          alt={module.headline}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
          priority
        />
        {/* Gradient scrim: only the lower band, so it sits behind the headline
            without darkening the whole image. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <h1
          data-sanity={headlineAttr}
          className="relative z-10 max-w-3xl p-6 text-left text-4xl font-semibold tracking-tight sm:p-10 sm:text-6xl"
        >
          {module.headline}
        </h1>
      </div>
    </section>
  );
}
