import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SaleInquiry } from "@/components/modules/SaleInquiry";
import { SanityImage } from "@/components/ui/SanityImage";
import { categoryLabel } from "@/sanity/lib/categories";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ARTWORK_QUERY,
  ARTWORK_SLUGS_QUERY,
  SALE_INQUIRY_QUERY,
} from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const artworks = await client.fetch(ARTWORK_SLUGS_QUERY);

  return artworks.flatMap(({ slug }: { slug: string | null }) =>
    slug ? [{ slug }] : []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: artwork } = await sanityFetch({
    query: ARTWORK_QUERY,
    params: { slug },
    stega: false,
  });

  if (!artwork) return {};

  return {
    title: artwork.title,
    openGraph: artwork.image
      ? {
          images: [
            { url: urlFor(artwork.image).width(1200).height(1200).fit("max").url() },
          ],
        }
      : undefined,
  };
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <>
      <dt className="opacity-60">{label}</dt>
      <dd>{value}</dd>
    </>
  );
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data: artwork }, { data: inquiryData }] = await Promise.all([
    sanityFetch({ query: ARTWORK_QUERY, params: { slug }, stega: false }),
    sanityFetch({ query: SALE_INQUIRY_QUERY, stega: false }),
  ]);

  if (!artwork) notFound();

  const dimensions = artwork.image?.dimensions;
  const saleInquiry = inquiryData?.saleInquiry;

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      {artwork.image && (
        <SanityImage
          image={artwork.image}
          alt={artwork.title}
          fill={false}
          width={dimensions?.width ?? 1600}
          height={dimensions?.height ?? 1200}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-[70vh] w-auto max-w-full object-contain"
          priority
        />
      )}

      <h1 className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">
        {artwork.title}
      </h1>

      <dl className="mt-6 grid w-fit grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
        <Detail label="Year" value={artwork.year} />
        <Detail label="Medium" value={artwork.type} />
        <Detail label="Dimensions" value={artwork.dimensions} />
        <Detail label="Category" value={categoryLabel(artwork.category)} />
      </dl>

      {artwork.forSale && artwork.price != null && saleInquiry && (
        <SaleInquiry
          price={artwork.price}
          artworkTitle={artwork.title}
          config={saleInquiry}
        />
      )}
    </article>
  );
}
