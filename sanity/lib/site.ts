// Canonical production URL, used for metadataBase, canonical tags, and the
// sitemap. Override with NEXT_PUBLIC_SITE_URL if the domain ever changes.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stephfrenzer.de";

// Fallback site name/description used when Site settings in the Studio
// don't have them filled in yet.
export const siteName = "Steph Frenzer";
export const siteDescription =
  "Malerei von Steph Frenzer – Öl- und Acrylbilder aus Münster.";
