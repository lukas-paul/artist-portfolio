/**
 * next/image loader that serves Sanity images straight from Sanity's CDN
 * instead of proxying them through `/_next/image` (Netlify Image CDN).
 *
 * Sanity already resizes and converts (`auto=format` → WebP/AVIF), so the
 * proxy only added a second transform hop and a cache that rarely hit —
 * ~0.7–1s per image vs. ~0.07s direct from cdn.sanity.io.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  if (!url.searchParams.has("fit")) url.searchParams.set("fit", "max");
  return url.toString();
}
