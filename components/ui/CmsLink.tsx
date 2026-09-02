import NextLink from "next/link";

export interface LinkLike {
  label: string;
  linkType?: "internal" | "external" | null;
  externalUrl?: string | null;
  internalLink?: { slug?: string | null } | null;
  openInNewTab?: boolean | null;
}

function resolveHref(link?: LinkLike | null): string | undefined {
  if (!link) return undefined;
  if (link.linkType === "external") return link.externalUrl ?? undefined;
  const slug = link.internalLink?.slug;
  if (!slug || slug === "index") return "/";
  return `/${slug}`;
}

export function CmsLink({
  link,
  className,
  children,
}: {
  link?: LinkLike | null;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = resolveHref(link);
  if (!link || !href) return null;

  return (
    <NextLink
      href={href}
      className={className}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children ?? link.label}
    </NextLink>
  );
}
