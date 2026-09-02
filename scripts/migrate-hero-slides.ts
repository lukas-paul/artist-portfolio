/**
 * One-off migration: hero `backgroundImages` (image[]) -> `slides` (heroSlide[]).
 *
 * Run once, then delete this file:
 *   npx sanity exec scripts/migrate-hero-slides.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient();

type ImageValue = {
  _key?: string;
  asset?: unknown;
  hotspot?: unknown;
  crop?: unknown;
};

async function run() {
  const pages = await client.fetch<
    { _id: string; modules?: Array<Record<string, unknown>> }[]
  >(`*[_type == "page" && defined(modules)]{ _id, modules }`);

  for (const page of pages) {
    const modules = page.modules ?? [];
    let changed = false;

    const nextModules = modules.map((mod) => {
      if (
        mod._type !== "hero" ||
        !Array.isArray(mod.backgroundImages) ||
        Array.isArray(mod.slides)
      ) {
        return mod;
      }

      changed = true;
      const { backgroundImages, ...rest } = mod as {
        backgroundImages: ImageValue[];
      } & Record<string, unknown>;

      return {
        ...rest,
        slides: backgroundImages.map((image, i) => ({
          _type: "heroSlide",
          _key: image._key ?? `slide-${i}`,
          image: {
            _type: "image",
            asset: image.asset,
            ...(image.hotspot ? { hotspot: image.hotspot } : {}),
            ...(image.crop ? { crop: image.crop } : {}),
          },
        })),
      };
    });

    if (changed) {
      await client.patch(page._id).set({ modules: nextModules }).commit();
      console.log(`migrated hero slides on ${page._id}`);
    }
  }

  console.log("done");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
