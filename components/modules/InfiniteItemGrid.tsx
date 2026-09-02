"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { ItemCard } from "@/components/modules/ItemCard";
import { columnClasses, type GridColumns } from "@/components/modules/gridColumns";
import { fetchMoreActiveArtworks } from "@/sanity/lib/actions";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { ActiveArtwork } from "@/sanity/lib/types";

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "Spuren", value: "spuren" },
  { label: "Draußen", value: "draussen" },
  { label: "Stories", value: "stories" },
];

export function InfiniteItemGrid({
  initialItems,
  pageSize,
  columns,
}: {
  initialItems: ActiveArtwork[];
  pageSize: number;
  columns: GridColumns;
}) {
  const [category, setCategory] = useState("all");
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
      <div className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[1.75rem] leading-tight">
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
        <label className="flex cursor-pointer items-center gap-2 opacity-60 hover:opacity-100">
          <input
            type="checkbox"
            checked={forSaleOnly}
            onChange={(event) => setForSaleOnly(event.target.checked)}
            className="h-6 w-6 shrink-0 appearance-none border border-black bg-white checked:bg-black"
          />
          For sale only
        </label>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-sm opacity-60">No artworks match these filters.</p>
      ) : (
        <div
          aria-busy={isPending}
          className={`grid gap-8 transition-opacity ${columnClasses[columns]} ${
            isPending ? "opacity-50" : ""
          }`}
        >
          {items.map((item) => (
            <ItemCard
              key={item._id}
              image={item.image}
              title={item.title}
              year={item.year}
              dimensions={item.dimensions}
              type={item.type}
              price={item.price}
              dataSanityImage={dataAttr({ id: item._id, type: "artwork", path: "image" })}
              dataSanityTitle={dataAttr({ id: item._id, type: "artwork", path: "title" })}
            />
          ))}
        </div>
      )}
      {hasMore && items.length > 0 && (
        <div ref={sentinelRef} aria-hidden className="h-1" />
      )}
    </>
  );
}
