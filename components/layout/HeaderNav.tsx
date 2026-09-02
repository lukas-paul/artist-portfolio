"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import type { NavPage } from "@/sanity/lib/types";

function navHref(slug: string) {
  return slug === "index" ? "/" : `/${slug}`;
}

export function HeaderNav({ navPages }: { navPages: NavPage[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 text-sm">
      {navPages.map((page) => {
        const href = navHref(page.slug);
        const active = pathname === href;

        return (
          <NextLink
            key={page.slug}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`hover:opacity-60 ${
              active ? "underline underline-offset-4" : ""
            }`}
          >
            {page.title}
          </NextLink>
        );
      })}
    </nav>
  );
}
