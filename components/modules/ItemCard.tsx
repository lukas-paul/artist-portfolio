import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/ui/SanityImage";

function formatPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ItemCard({
  image,
  title,
  text,
  year,
  dimensions,
  type,
  price,
  dataSanityImage,
  dataSanityTitle,
  dataSanityText,
}: {
  image?: SanityImageSource | null;
  title: string;
  text?: string | null;
  year?: number | null;
  dimensions?: string | null;
  type?: string | null;
  price?: number | null;
  dataSanityImage?: string;
  dataSanityTitle?: string;
  dataSanityText?: string;
}) {
  const details = [type, dimensions].filter(Boolean).join(" · ");

  return (
    <div>
      {image && (
        <div
          data-sanity={dataSanityImage}
          className="relative mb-4 aspect-[4/3] w-full bg-black/5"
        >
          <SanityImage image={image} alt={title} className="object-cover" />
        </div>
      )}
      {year != null && (
        <p className="text-xs uppercase tracking-wide opacity-60">{year}</p>
      )}
      <h3 data-sanity={dataSanityTitle} className="font-medium">
        {title}
      </h3>
      {details && <p className="mt-1 text-sm opacity-70">{details}</p>}
      {price != null && (
        <p className="mt-1 text-sm opacity-70">{formatPrice(price)}</p>
      )}
      {text && (
        <p data-sanity={dataSanityText} className="mt-1 text-sm opacity-70">
          {text}
        </p>
      )}
    </div>
  );
}
