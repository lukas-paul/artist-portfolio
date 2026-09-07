import Link from "next/link";

import { SanityImage } from "@/components/ui/SanityImage";
import { columnClasses } from "@/components/modules/gridColumns";
import { ARTWORK_CATEGORIES, categoryLabel } from "@/sanity/lib/categories";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { CategoryTeasersModule } from "@/sanity/lib/types";

export function CategoryTeasers({
  module,
  documentId,
}: {
  module: CategoryTeasersModule;
  documentId: string;
}) {
  const root = `modules[_key=="${module._key}"]`;

  // Fall back to plain links for every category when none are configured yet.
  const teasers =
    module.teasers && module.teasers.length > 0
      ? module.teasers
      : ARTWORK_CATEGORIES.map((category) => ({
          _key: category.value,
          category: category.value,
          image: null,
          text: null,
        }));

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      {module.heading && (
        <h2
          data-sanity={dataAttr({
            id: documentId,
            type: "page",
            path: `${root}.heading`,
          })}
          className="mb-8 text-2xl font-semibold tracking-tight"
        >
          {module.heading}
        </h2>
      )}

      <div className={`grid gap-8 ${columnClasses["3"]}`}>
        {teasers.map((teaser) => (
          <Link
            key={teaser._key}
            href={`/works/${teaser.category}`}
            className="group block"
          >
            <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-black/5">
              {teaser.image && (
                <SanityImage
                  image={teaser.image}
                  alt={categoryLabel(teaser.category)}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="text-xl font-medium">
              {categoryLabel(teaser.category)}
            </h3>
            {teaser.text && (
              <p className="mt-1 text-sm opacity-70">{teaser.text}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
