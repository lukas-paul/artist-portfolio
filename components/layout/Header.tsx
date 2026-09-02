import NextLink from "next/link";

import type { NavPage, SiteSettings } from "@/sanity/lib/types";

function navHref(slug: string) {
  return slug === "index" ? "/" : `/${slug}`;
}

export function Header({
  settings,
  navPages,
}: {
  settings?: SiteSettings;
  navPages?: NavPage[];
}) {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <NextLink href="/" className="text-lg font-semibold tracking-tight">
          {settings?.title ?? "Portfolio"}
        </NextLink>
        {navPages && navPages.length > 0 && (
          <nav className="flex gap-6 text-sm">
            {navPages.map((page) => (
              <NextLink
                key={page.slug}
                href={navHref(page.slug)}
                className="hover:opacity-60"
              >
                {page.title}
              </NextLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
