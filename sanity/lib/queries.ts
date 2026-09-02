import { defineQuery } from "next-sanity";

const linkFields = /* groq */ `
  _key,
  label,
  linkType,
  openInNewTab,
  externalUrl,
  internalLink->{ "slug": slug.current }
`;

const blockContentFields = /* groq */ `
  ...,
  _type == "richTextImage" => {
    ...,
    asset->
  }
`;

const videoSourceFields = /* groq */ `
  sourceType,
  file{ asset-> },
  url
`;

const moduleFields = /* groq */ `
  _type,
  _key,
  _type == "hero" => {
    backgroundType,
    slides[]{
      _key,
      image,
      headline,
      text,
      link{ ${linkFields} }
    },
    backgroundVideo{ ${videoSourceFields} },
    headline,
    text,
    link{ ${linkFields} }
  },
  _type == "pageHero" => {
    headline,
    image
  },
  _type == "textBlock" => {
    heading,
    content[]{ ${blockContentFields} },
    width
  },
  _type == "textMedia" => {
    mediaType,
    image,
    video{ ${videoSourceFields} },
    content[]{ ${blockContentFields} },
    mediaPosition
  },
  _type == "accordion" => {
    heading,
    items[]{ _key, title, content[]{ ${blockContentFields} } }
  },
  _type == "itemGrid" => {
    heading,
    columns,
    source,
    pageSize,
    items[]{
      _key,
      _type == "reference" => @->{
        _type,
        _id,
        title,
        year,
        dimensions,
        type,
        category,
        price,
        image,
        active
      },
      _type == "gridItem" => {
        _type,
        image,
        title,
        text,
        link{ ${linkFields} }
      }
    }
  },
  _type == "media" => {
    mediaType,
    image,
    video{ ${videoSourceFields} },
    caption
  },
  _type == "cta" => {
    heading,
    text,
    link{ ${linkFields} },
    background
  }
`;

export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    modules[]{ ${moduleFields} },
    seo
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current)]{ "slug": slug.current }
`);

export const NAV_PAGES_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && showInNav == true] | order(coalesce(navOrder, 9999) asc) {
    title,
    "slug": slug.current
  }
`);

export const ACTIVE_ARTWORKS_PAGE_QUERY = defineQuery(/* groq */ `
  *[
    _type == "artwork" && active == true
    && ($category == "all" || category == $category)
    && ($forSaleOnly != true || forSale == true)
  ]
    | order(coalesce(year, 0) desc)
    [$start...$end]{
      _type,
      _id,
      title,
      year,
      dimensions,
      type,
      category,
      price,
      forSale,
      image
    }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    footerText,
    footerLinks[]{ ${linkFields} },
    socialLinks[]{ ${linkFields} }
  }
`);
