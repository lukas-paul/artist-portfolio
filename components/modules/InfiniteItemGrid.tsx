"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";

import { ItemCard } from "@/components/modules/ItemCard";
import { columnClasses, type GridColumns } from "@/components/modules/gridColumns";
import { fetchMoreActiveArtworks } from "@/sanity/lib/actions";
import { ARTWORK_CATEGORIES } from "@/sanity/lib/categories";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { ActiveArtwork } from "@/sanity/lib/types";

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  ...ARTWORK_CATEGORIES.map((category) => ({ ...category })),
];

export function InfiniteItemGrid({
  initialItems,
  pageSize,
  columns,
  fixedCategory,
  showCategoryFilter = true,
  showForSaleFilter = true,
}: {
  initialItems: ActiveArtwork[];
  pageSize: number;
  columns: GridColumns;
  /** Lock the grid to one category and hide the category buttons. */
  fixedCategory?: string;
  showCategoryFilter?: boolean;
  /** Hide the "zu verkaufen" checkbox, e.g. when nothing in the list is for sale. */
  showForSaleFilter?: boolean;
}) {
  const [category, setCategory] = useState(fixedCategory ?? "all");
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialItems.length === pageSize);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);
  // Bumped on every filter change so stale in-flight fetches can be discarded.
  const genRef = useRef(0);
  const firstRender = useRef(true);

  // Refetch from the top whenever a filter changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const gen = ++genRef.current;
    startTransition(async () => {
      const next = await fetchMoreActiveArtworks(0, pageSize, {
        category,
        forSaleOnly,
      });
      if (gen === genRef.current) {
        setItems(next);
        setHasMore(next.length === pageSize);
      }
    });
  }, [category, forSaleOnly, pageSize]);

  // Load the next page when the sentinel scrolls into view.
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending) {
          const gen = genRef.current;
          startTransition(async () => {
            const next = await fetchMoreActiveArtworks(items.length, pageSize, {
              category,
              forSaleOnly,
            });
            if (gen === genRef.current) {
              setItems((prev) => [...prev, ...next]);
              setHasMore(next.length === pageSize);
            }
          });
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isPending, items.length, pageSize, category, forSaleOnly]);

  return (
    <>
      {(showCategoryFilter || showForSaleFilter) && (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[1.75rem] leading-tight">
          {showCategoryFilter && (
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORY_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setCategory(filter.value)}
                  aria-pressed={category === filter.value}
                  className={
                    category === filter.value
                      ? "underline underline-offset-4"
                      : "opacity-60 hover:opacity-100"
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
          {showForSaleFilter && (
            <label className="flex cursor-pointer items-center gap-2 text-base leading-normal opacity-60 hover:opacity-100 sm:ml-auto">
              <input
                type="checkbox"
                checked={forSaleOnly}
                onChange={(event) => setForSaleOnly(event.target.checked)}
                className="h-4 w-4 shrink-0 appearance-none border border-black bg-white checked:bg-black"
              />
              zu verkaufen
            </label>
          )}
        </div>
      )}

      {items.length === 0 ? (
        <p className="py-8 text-sm opacity-60">No artworks match these filters.</p>
      ) : (
        <div
          aria-busy={isPending}
          className={`grid gap-8 transition-opacity ${columnClasses[columns]} ${
            isPending ? "opacity-50" : ""
          }`}
        >
          {items.map((item) => {
            const card = (
              <ItemCard
                image={item.image}
                title={item.title}
                year={item.year}
                dimensions={item.dimensions}
                type={item.type}
                dataSanityImage={dataAttr({ id: item._id, type: "artwork", path: "image" })}
                dataSanityTitle={dataAttr({ id: item._id, type: "artwork", path: "title" })}
              />
            );

            return item.slug ? (
              <Link key={item._id} href={`/artwork/${item.slug}`} className="block">
                {card}
              </Link>
            ) : (
              <div key={item._id}>{card}</div>
            );
          })}
        </div>
      )}
      {hasMore && items.length > 0 && (
        <div ref={sentinelRef} aria-hidden className="h-1" />
      )}
    </>
  );
}
