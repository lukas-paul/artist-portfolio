import type { SchemaTypeDefinition } from "sanity";

import { item } from "./documents/item";
import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";
import { accordion } from "./objects/accordion";
import { blockContent } from "./objects/blockContent";
import { cta } from "./objects/cta";
import { hero } from "./objects/hero";
import { itemGrid } from "./objects/itemGrid";
import { link } from "./objects/link";
import { media } from "./objects/media";
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
    item,
    // Objects
    blockContent,
    link,
    seo,
    richTextImage,
    videoSource,
    // Modules
    hero,
    textBlock,
    textMedia,
    accordion,
    itemGrid,
    media,
    cta,
  ],
};
