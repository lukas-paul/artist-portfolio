import type { Metadata } from "next";

import { categoryLabel } from "./categories";
import { siteName, siteUrl } from "./site";

/**
 * Auto-generates an artwork meta description from its fields, since the
 * `artwork` schema has no dedicated SEO field to fill in by hand.
 */
export function artworkDescription(artwork: {
  type?: string | null;
  dimensions?: string | null;
  year?: number | null;
  category?: string | null;
}): string {
  const details = [artwork.type, artwork.dimensions, artwork.year]
    .filter(Boolean)
    .join(", ");
  const category = categoryLabel(artwork.category);

  return [details, category && `${category} – Malerei von ${siteName}.`]
    .filter(Boolean)
    .join(". ");
}

/**
 * Builds a self-contained page Metadata object (title, description,
 * canonical, OpenGraph, Twitter card).
 *
 * Next.js metadata merging replaces nested objects like `openGraph` wholesale
 * rather than merging field-by-field, so any page that sets its own
 * `openGraph` needs to repeat the shared fields (type, siteName, locale) or
 * lose them. Building the full object here once avoids that trap.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  siteName: ogSiteName = siteName,
}: {
  title: string;
  description?: string | null;
  /** Site-relative path, e.g. "/" or "/artwork/land-unter". */
  path: string;
  /** Absolute image URL for social previews. */
  image?: string | null;
  siteName?: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  const desc = description ?? undefined;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: ogSiteName,
      locale: "de_DE",
      title,
      description: desc,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}
