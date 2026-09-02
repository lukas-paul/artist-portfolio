"use client";

import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { HeroContent, usableLink } from "@/components/modules/HeroContent";
import { SanityImage } from "@/components/ui/SanityImage";
import type { LinkLike } from "@/components/ui/CmsLink";
import { dataAttr } from "@/sanity/lib/dataAttr";

export type HeroSlide = {
  _key: string;
  image?: SanityImageSource | null;
  headline?: string | null;
  text?: string | null;
  link?: LinkLike | null;
};

export function HeroSlider({
  slides,
  fallbackHeadline,
  fallbackText,
  fallbackLink,
  documentId,
  moduleKey,
}: {
  slides: HeroSlide[];
  fallbackHeadline: string;
  fallbackText?: string | null;
  fallbackLink?: LinkLike | null;
  documentId: string;
  moduleKey: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (next: number) => setIndex((next + count) % count);

  // Touch drag
  const frameRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<"h" | "v" | null>(null);
  const dragRef = useRef(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const onTouchStart = (event: TouchEvent) => {
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
    axis.current = null;
    dragRef.current = 0;
    setDragging(true);
  };

  const onTouchMove = (event: TouchEvent) => {
    const dx = event.touches[0].clientX - startX.current;
    const dy = event.touches[0].clientY - startY.current;
    if (axis.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
    }
    if (axis.current !== "h") return;
    const atEdge = (index === 0 && dx > 0) || (index === count - 1 && dx < 0);
    const next = atEdge ? dx * 0.3 : dx;
    dragRef.current = next;
    setDrag(next);
  };

  const onTouchEnd = () => {
    const width = frameRef.current?.offsetWidth ?? 1;
    const threshold = Math.min(width * 0.18, 90);
    const d = dragRef.current;
    if (d <= -threshold && index < count - 1) setIndex(index + 1);
    else if (d >= threshold && index > 0) setIndex(index - 1);
    dragRef.current = 0;
    setDrag(0);
    setDragging(false);
    axis.current = null;
  };

  const active = slides[index];
  const slidePath = (field: string) =>
    dataAttr({
      id: documentId,
      type: "page",
      path: `modules[_key=="${moduleKey}"].slides[_key=="${active._key}"].${field}`,
    });

  return (
    <>
      <div
        ref={frameRef}
        aria-roledescription="carousel"
        aria-label="Hero slides"
        className="absolute inset-0 z-0 touch-pan-y select-none overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`flex h-full ${
            dragging ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide._key}
              aria-hidden={i !== index}
              className="relative h-full w-full shrink-0"
            >
              <SanityImage
                image={slide.image}
                alt={i === 0 ? slide.headline || fallbackHeadline : ""}
                className="object-cover opacity-80"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <HeroContent
        key={index}
        className="animate-[heroFade_500ms_ease-out]"
        headline={active.headline || fallbackHeadline}
        text={active.text || fallbackText}
        link={usableLink(active.link) ? active.link : fallbackLink}
        headlineDataSanity={slidePath("headline")}
        textDataSanity={slidePath("text")}
      />

      <div className="pointer-events-none absolute inset-0 z-30">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="pointer-events-auto absolute left-1 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white sm:left-6 sm:p-3"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-7 w-7 [stroke-width:1.5] sm:h-11 sm:w-11 sm:[stroke-width:3]"
          >
            <path d="M15 18l-6-6 6-6" stroke="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="pointer-events-auto absolute right-1 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white sm:right-6 sm:p-3"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-7 w-7 [stroke-width:1.5] sm:h-11 sm:w-11 sm:[stroke-width:3]"
          >
            <path d="M9 6l6 6-6 6" stroke="currentColor" />
          </svg>
        </button>

        <div className="pointer-events-auto absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 sm:bottom-6">
          {slides.map((slide, i) => (
            <button
              key={slide._key}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="p-1.5"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
