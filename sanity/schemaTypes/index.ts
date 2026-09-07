import type { SchemaTypeDefinition } from "sanity";

import { artwork } from "./documents/artwork";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";
import { accordion } from "./objects/accordion";
import { blockContent } from "./objects/blockContent";
import { categoryTeasers } from "./objects/categoryTeasers";
import { cta } from "./objects/cta";
import { hero } from "./objects/hero";
import { itemGrid } from "./objects/itemGrid";
import { link } from "./objects/link";
import { media } from "./objects/media";
import { pageHero } from "./objects/pageHero";
import { richTextImage } from "./objects/richTextImage";
import { seo } from "./objects/seo";
import { textBlock } from "./objects/textBlock";
import { textMedia } from "./objects/textMedia";
import { videoSource } from "./objects/videoSource";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    siteSettings,
    artwork,
    // Objects
    blockContent,
    link,
    seo,
    richTextImage,
    videoSource,
    // Modules
    hero,
    pageHero,
    textBlock,
    textMedia,
    accordion,
    itemGrid,
    categoryTeasers,
    media,
    cta,
  ],
};
