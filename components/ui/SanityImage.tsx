import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

export function SanityImage({
  image,
  alt,
  sizes = "100vw",
  className,
  fill = true,
  width,
  height,
  priority,
}: {
  image?: SanityImageSource | null;
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  /** Required when `fill` is false. */
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  if (!image) return null;

  if (!fill) {
    if (!width || !height) return null;
    return (
      <Image
        src={urlFor(image).width(2000).auto("format").url()}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={urlFor(image).auto("format").fit("max").url()}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
