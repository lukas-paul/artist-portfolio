import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

export function SanityImage({
  image,
  alt,
  sizes = "100vw",
  className,
  fill = true,
  priority,
}: {
  image?: SanityImageSource | null;
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  if (!image) return null;

  const src = urlFor(image).auto("format").fit("max").url();

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
