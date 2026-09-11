import type { MetadataRoute } from "next";

import { ARTWORK_CATEGORIES } from "@/sanity/lib/categories";
import { client } from "@/sanity/lib/client";
import { siteUrl } from "@/sanity/lib/site";

// Refresh the sitemap hourly rather than only on deploy, so new artworks
// and pages are picked up without a redeploy.
export const revalidate = 3600;

type SlugEntry = { slug: string; updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, artworks] = await Promise.all([
    client.fetch<SlugEntry[]>(
      `*[_type == "page" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
    ),
    client.fetch<SlugEntry[]>(
      `*[_type == "artwork" && active == true && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
    ),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages.map(({ slug, updatedAt }) => ({
    url: slug === "index" ? siteUrl : `${siteUrl}/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  const categoryEntries: MetadataRoute.Sitemap = ARTWORK_CATEGORIES.map(
    (category) => ({
      url: `${siteUrl}/works/${category.value}`,
    })
  );

  const artworkEntries: MetadataRoute.Sitemap = artworks.map(
    ({ slug, updatedAt }) => ({
      url: `${siteUrl}/artwork/${slug}`,
      lastModified: new Date(updatedAt),
    })
  );

  return [...pageEntries, ...categoryEntries, ...artworkEntries];
}
