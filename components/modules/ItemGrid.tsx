import Link from "next/link";

import { CmsLink } from "@/components/ui/CmsLink";
import { ItemCard } from "@/components/modules/ItemCard";
import { InfiniteItemGrid } from "@/components/modules/InfiniteItemGrid";
import { columnClasses } from "@/components/modules/gridColumns";
import { client } from "@/sanity/lib/client";
import { dataAttr } from "@/sanity/lib/dataAttr";
import { ACTIVE_ARTWORKS_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ItemGridModule } from "@/sanity/lib/types";

export async function ItemGrid({
  module,
  documentId,
}: {
  module: ItemGridModule;
  documentId: string;
}) {
  const columns = module.columns ?? "3";
  const root = `modules[_key=="${module._key}"]`;

  const heading = module.heading && (
    <h2
      data-sanity={dataAttr({ id: documentId, type: "page", path: `${root}.heading` })}
      className="mb-8 text-2xl font-semibold tracking-tight"
    >
      {module.heading}
    </h2>
  );

  if (module.source === "all-active") {
    const pageSize = module.pageSize ?? 12;
    const firstPage = await client.fetch(ACTIVE_ARTWORKS_PAGE_QUERY, {
      start: 0,
      end: pageSize,
      category: "all",
      forSaleOnly: false,
    });

    return (
      <section
        data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
        className="mx-auto max-w-5xl px-6 py-16"
      >
        {heading}
        <InfiniteItemGrid initialItems={firstPage} pageSize={pageSize} columns={columns} />
      </section>
    );
  }

  const items = (module.items ?? []).filter(
    (item) => !(item._type === "artwork" && item.active === false)
  );

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      {heading}
      <div className={`grid gap-8 ${columnClasses[columns]}`}>
        {items.map((item) => {
          // Referenced Artworks are edited on the Artwork document itself; inline
          // "Custom card" entries are edited in place within this module.
          const isArtwork = item._type === "artwork";
          const cardId = isArtwork ? item._id : documentId;
          const cardType = isArtwork ? "artwork" : "page";
          const fieldPath = (field: string) =>
            isArtwork
              ? field
              : `${root}.items[_key=="${item._key}"].${field}`;

          const card = (
            <ItemCard
              image={item.image}
              title={item.title}
              text={isArtwork ? undefined : item.text}
              year={isArtwork ? item.year : undefined}
              dimensions={isArtwork ? item.dimensions : undefined}
              type={isArtwork ? item.type : undefined}
              price={isArtwork ? item.price : undefined}
              forSale={isArtwork ? item.forSale : undefined}
              dataSanityImage={dataAttr({ id: cardId, type: cardType, path: fieldPath("image") })}
              dataSanityTitle={dataAttr({ id: cardId, type: cardType, path: fieldPath("title") })}
              dataSanityText={dataAttr({ id: cardId, type: cardType, path: fieldPath("text") })}
            />
          );

          if (isArtwork && item.slug) {
            return (
              <Link key={item._key} href={`/artwork/${item.slug}`} className="block">
                {card}
              </Link>
            );
          }

          return item._type === "gridItem" && item.link ? (
            <CmsLink key={item._key} link={item.link} className="block">
              {card}
            </CmsLink>
          ) : (
            <div key={item._key}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
