import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HeadlineHero } from "@/components/modules/HeadlineHero";
import { InfiniteItemGrid } from "@/components/modules/InfiniteItemGrid";
import { ARTWORK_CATEGORIES, categoryLabel } from "@/sanity/lib/categories";
import { client } from "@/sanity/lib/client";
import {
  ACTIVE_ARTWORKS_PAGE_QUERY,
  CATEGORY_FOR_SALE_COUNT_QUERY,
} from "@/sanity/lib/queries";

const PAGE_SIZE = 12;

function isValidCategory(value: string) {
  return ARTWORK_CATEGORIES.some((category) => category.value === value);
}

export function generateStaticParams() {
  return ARTWORK_CATEGORIES.map((category) => ({ category: category.value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};
  return { title: categoryLabel(category) };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const [firstPage, forSaleCount] = await Promise.all([
    client.fetch(ACTIVE_ARTWORKS_PAGE_QUERY, {
      start: 0,
      end: PAGE_SIZE,
      category,
      forSaleOnly: false,
    }),
    client.fetch(CATEGORY_FOR_SALE_COUNT_QUERY, { category }),
  ]);

  return (
    <>
      <HeadlineHero headline={categoryLabel(category)} />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <InfiniteItemGrid
          initialItems={firstPage}
          pageSize={PAGE_SIZE}
          columns="3"
          fixedCategory={category}
          showCategoryFilter={false}
          showForSaleFilter={forSaleCount > 0}
        />
      </section>
    </>
  );
}
