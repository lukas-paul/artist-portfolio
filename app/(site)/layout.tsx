import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SanityLive } from "@/sanity/lib/live";
import { NAV_PAGES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { siteDescription, siteName, siteUrl } from "@/sanity/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });

  const title = settings?.title ?? siteName;
  const description = settings?.description ?? siteDescription;

  // Site-wide defaults; individual pages build their own complete
  // `openGraph`/`twitter` (see sanity/lib/seo.ts) since Next.js replaces
  // these nested objects wholesale rather than merging them.
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: title,
      locale: "de_DE",
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });
  const { data: navPages } = await sanityFetch({
    query: NAV_PAGES_QUERY,
    stega: false,
  });
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <Header settings={settings ?? undefined} navPages={navPages} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings ?? undefined} />
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  );
}
