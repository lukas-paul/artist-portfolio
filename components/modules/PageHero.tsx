import { SanityImage } from "@/components/ui/SanityImage";
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
  const hasImage = Boolean(module.image);

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6"
    >
      <div
        className={`relative flex min-h-[70vh] items-center justify-center overflow-hidden ${
          hasImage ? "bg-black text-white" : ""
        }`}
      >
        {hasImage && (
          <>
            <SanityImage
              image={module.image}
              alt={module.headline}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}
        <h1
          data-sanity={dataAttr({
            id: documentId,
            type: "page",
            path: `${root}.headline`,
          })}
          className="relative z-10 max-w-3xl text-center text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {module.headline}
        </h1>
      </div>
    </section>
  );
}
