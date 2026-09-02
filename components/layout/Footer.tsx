import { CmsLink } from "@/components/ui/CmsLink";
import type { SiteSettings } from "@/sanity/lib/types";

export function Footer({ settings }: { settings?: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 text-sm sm:grid-cols-3">
        <div>
          <p className="opacity-70">
            {settings?.footerText ?? `© ${year} ${settings?.title ?? ""}`}
          </p>
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
              {settings.socialLinks.map((link) => (
                <li key={link._key}>
                  <CmsLink link={link} className="hover:opacity-60" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
