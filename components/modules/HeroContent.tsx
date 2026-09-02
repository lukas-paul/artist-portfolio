import { CmsLink, type LinkLike } from "@/components/ui/CmsLink";

/** A CMS link is only worth rendering if it has a label and a resolvable target. */
export function usableLink(link?: LinkLike | null) {
  if (!link?.label) return false;
  return link.linkType === "external"
    ? Boolean(link.externalUrl)
    : Boolean(link.internalLink?.slug);
}

export function HeroContent({
  headline,
  text,
  link,
  className,
  headlineDataSanity,
  textDataSanity,
}: {
  headline: string;
  text?: string | null;
  link?: LinkLike | null;
  className?: string;
  headlineDataSanity?: string;
  textDataSanity?: string;
}) {
  return (
    <div
      className={`relative z-20 mx-auto w-full max-w-5xl px-6 pt-16 pb-24 sm:pb-28 ${className ?? ""}`}
    >
      <h1
        data-sanity={headlineDataSanity}
        className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        {headline}
      </h1>
      {text && (
        <p
          data-sanity={textDataSanity}
          className="mt-4 max-w-xl text-lg opacity-80"
        >
          {text}
        </p>
      )}
      {link && (
        <CmsLink
          link={link}
          className="mt-8 inline-block border border-white px-6 py-3 text-sm hover:bg-white hover:text-black"
        />
      )}
    </div>
  );
}
