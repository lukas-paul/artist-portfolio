import NextLink from "next/link";

import { HeaderNav } from "@/components/layout/HeaderNav";
import type { NavPage, SiteSettings } from "@/sanity/lib/types";

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
        <NextLink href="/" className="text-xl font-semibold tracking-tight">
          {settings?.title ?? "Portfolio"}
        </NextLink>
        {navPages && navPages.length > 0 && <HeaderNav navPages={navPages} />}
      </div>
    </header>
  );
}
