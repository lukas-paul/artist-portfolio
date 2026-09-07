"use client";

import { useEffect, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/ui/SanityImage";

export function ArtworkImage({
  image,
  alt,
  width,
  height,
}: {
  image?: SanityImageSource | null;
  alt: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!image) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} vergrößern`}
        className="block w-fit cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <SanityImage
          image={image}
          alt={alt}
          fill={false}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-[70vh] w-auto max-w-full object-contain"
          priority
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-zoom-out bg-black/80"
          />
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 text-3xl leading-none text-white/70 hover:text-white"
          >
            &times;
          </button>
          <SanityImage
            image={image}
            alt={alt}
            fill={false}
            width={width}
            height={height}
            sizes="90vw"
            className="relative z-10 h-[90vh] w-auto max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
