import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/ui/SanityImage";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ItemCard({
  image,
  title,
  text,
  date,
  dataSanityImage,
  dataSanityTitle,
  dataSanityText,
}: {
  image?: SanityImageSource | null;
  title: string;
  text?: string | null;
  date?: string | null;
  dataSanityImage?: string;
  dataSanityTitle?: string;
  dataSanityText?: string;
}) {
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
      {date && (
        <p className="text-xs uppercase tracking-wide opacity-60">{formatDate(date)}</p>
      )}
      <h3 data-sanity={dataSanityTitle} className="font-medium">
        {title}
      </h3>
      {text && (
        <p data-sanity={dataSanityText} className="mt-1 text-sm opacity-70">
          {text}
        </p>
      )}
    </div>
  );
}
