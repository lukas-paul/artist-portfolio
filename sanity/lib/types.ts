import type {
  ACTIVE_ARTWORKS_PAGE_QUERY_RESULT,
  NAV_PAGES_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  SALE_INQUIRY_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

export type PageData = NonNullable<PAGE_QUERY_RESULT>;
export type PageModule = NonNullable<PageData["modules"]>[number];
export type HeroModule = Extract<PageModule, { _type: "hero" }>;
export type PageHeroModule = Extract<PageModule, { _type: "pageHero" }>;
export type TextBlockModule = Extract<PageModule, { _type: "textBlock" }>;
export type TextMediaModule = Extract<PageModule, { _type: "textMedia" }>;
export type AccordionModule = Extract<PageModule, { _type: "accordion" }>;
export type ItemGridModule = Extract<PageModule, { _type: "itemGrid" }>;
export type CategoryTeasersModule = Extract<
  PageModule,
  { _type: "categoryTeasers" }
>;
export type CategoryTeaser = NonNullable<
  CategoryTeasersModule["teasers"]
>[number];
export type MediaModule = Extract<PageModule, { _type: "media" }>;
export type CtaModule = Extract<PageModule, { _type: "cta" }>;
export type AccordionItem = NonNullable<AccordionModule["items"]>[number];
export type GridItem = NonNullable<ItemGridModule["items"]>[number];
export type ActiveArtwork = ACTIVE_ARTWORKS_PAGE_QUERY_RESULT[number];

export type RichText = TextBlockModule["content"];
export type RichTextImage = Extract<RichText[number], { _type: "richTextImage" }>;

export type VideoSource = HeroModule["backgroundVideo"];

export type SaleInquiry = NonNullable<
  NonNullable<SALE_INQUIRY_QUERY_RESULT>["saleInquiry"]
>;

export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;
export type Link = NonNullable<SiteSettings["footerLinks"]>[number];
export type NavPage = NAV_PAGES_QUERY_RESULT[number];
