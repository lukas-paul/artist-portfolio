"use client";

import { useEffect, useId, useState } from "react";

import { PortableTextContent } from "@/components/ui/PortableTextContent";
import { formatPrice } from "@/sanity/lib/format";
import type { SaleInquiry as SaleInquiryConfig } from "@/sanity/lib/types";

export function SaleInquiry({
  price,
  artworkTitle,
  config,
}: {
  price: number;
  artworkTitle: string;
  config: SaleInquiryConfig;
}) {
  const [open, setOpen] = useState(false);
  const headingId = useId();

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

  const mailto = config.email
    ? `mailto:${config.email}?subject=${encodeURIComponent(
        `Anfrage: ${artworkTitle}`
      )}`
    : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 border border-black px-6 py-2 text-sm transition-colors hover:bg-black hover:text-white"
      >
        {config.buttonLabel || "Kaufanfrage"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={config.heading ? headingId : undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50"
          />
          <div className="relative z-10 w-full max-w-md bg-white p-8 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-2xl leading-none opacity-60 hover:opacity-100"
            >
              &times;
            </button>

            {config.heading && (
              <h2 id={headingId} className="text-xl font-semibold tracking-tight">
                {config.heading}
              </h2>
            )}

            {config.body && (
              <PortableTextContent
                value={config.body}
                className="prose-sm mt-3"
              />
            )}

            <p className="mt-6 text-lg font-medium">{formatPrice(price)}</p>

            {mailto && (
              <a
                href={mailto}
                className="mt-4 inline-block border border-black px-6 py-2 text-sm transition-colors hover:bg-black hover:text-white"
              >
                E-Mail schreiben
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
