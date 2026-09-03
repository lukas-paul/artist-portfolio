import { CmsLink, resolveHref } from "@/components/ui/CmsLink";
import { PortableTextContent } from "@/components/ui/PortableTextContent";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SiteSettings } from "@/sanity/lib/types";

export function Footer({ settings }: { settings?: SiteSettings }) {
  const year = new Date().getFullYear();
  const hasFooterContent =
    settings?.footerContent && settings.footerContent.length > 0;

  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 text-sm sm:grid-cols-3">
        <div className="opacity-70">
          {hasFooterContent ? (
            <PortableTextContent
              value={settings!.footerContent}
              className="prose-sm"
            />
          ) : (
            <p>
              {settings?.footerText ?? `© ${year} ${settings?.title ?? ""}`}
            </p>
          )}
        </div>

        {settings?.footerLinks && settings.footerLinks.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide opacity-50">
              Links
            </h3>
            <ul className="space-y-2">
              {settings.footerLinks.map((link) => (
                <li key={link._key}>
                  <CmsLink link={link} className="hover:opacity-60" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {settings?.socialLinks && settings.socialLinks.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide opacity-50">
              Follow
            </h3>
            <ul className="space-y-2">
              {settings.socialLinks.map((link) => {
                const href = resolveHref(link);
                if (!href) return null;
                return (
                  <li key={link._key}>
                    <a
                      href={href}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 hover:opacity-60"
                    >
                      <SocialIcon href={href} className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
