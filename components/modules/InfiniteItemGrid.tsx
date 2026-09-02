"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { ItemCard } from "@/components/modules/ItemCard";
import { columnClasses, type GridColumns } from "@/components/modules/gridColumns";
import { fetchMoreActiveItems } from "@/sanity/lib/actions";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { ActiveItem } from "@/sanity/lib/types";

export function InfiniteItemGrid({
  initialItems,
  pageSize,
  columns,
}: {
  initialItems: ActiveItem[];
  pageSize: number;
  columns: GridColumns;
}) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialItems.length === pageSize);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending) {
          startTransition(async () => {
            const next = await fetchMoreActiveItems(items.length, pageSize);
            setItems((prev) => [...prev, ...next]);
            setHasMore(next.length === pageSize);
          });
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isPending, items.length, pageSize]);

  return (
    <>
      <div className={`grid gap-8 ${columnClasses[columns]}`}>
        {items.map((item) => (
          <ItemCard
            key={item._id}
            image={item.image}
            title={item.title}
            text={item.text}
            date={item.date}
            dataSanityImage={dataAttr({ id: item._id, type: "item", path: "image" })}
            dataSanityTitle={dataAttr({ id: item._id, type: "item", path: "title" })}
            dataSanityText={dataAttr({ id: item._id, type: "item", path: "text" })}
          />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden className="h-1" />}
    </>
  );
}
