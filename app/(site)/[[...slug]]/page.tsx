import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/modules/PageBuilder";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/seo";
import { siteDescription } from "@/sanity/lib/site";

export async function generateStaticParams() {
  const pages = await client.fetch(PAGE_SLUGS_QUERY);

  return pages.map(({ slug }: { slug: string }) => ({
    slug: !slug || slug === "index" ? [] : slug.split("/"),
  }));
}

function slugFromParams(slug?: string[]) {
  return slug && slug.length > 0 ? slug.join("/") : "index";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: slugFromParams(slug) },
    stega: false,
  });

  if (!page) return {};

  return buildMetadata({
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || siteDescription,
    path: slug && slug.length > 0 ? `/${slug.join("/")}` : "/",
    image: page.seo?.ogImage
      ? urlFor(page.seo.ogImage).width(1200).height(630).url()
      : undefined,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: slugFromParams(slug) },
    stega: false,
  });

  if (!page) notFound();

  return <PageBuilder modules={page.modules} documentId={page._id} />;
}
