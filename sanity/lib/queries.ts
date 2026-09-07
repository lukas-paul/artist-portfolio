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

const artworkCardFields = /* groq */ `
  _type,
  _id,
  title,
  "slug": slug.current,
  year,
  dimensions,
  type,
  category,
  price,
  forSale,
  image
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
        ${artworkCardFields},
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
  _type == "categoryTeasers" => {
    heading,
    teasers[]{ _key, category, image, text }
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
      ${artworkCardFields}
    }
`);

export const CATEGORY_FOR_SALE_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[
    _type == "artwork" && active == true && category == $category && forSale == true
  ])
`);

export const ARTWORK_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "artwork" && active == true && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const ARTWORK_QUERY = defineQuery(/* groq */ `
  *[_type == "artwork" && slug.current == $slug && active == true][0]{
    _id,
    title,
    "slug": slug.current,
    year,
    dimensions,
    type,
    category,
    price,
    forSale,
    image{
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`);

export const SALE_INQUIRY_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    saleInquiry{
      buttonLabel,
      heading,
      email,
      body[]{ ${blockContentFields} }
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    footerText,
    footerContent[]{ ${blockContentFields} },
    footerLinks[]{ ${linkFields} },
    socialLinks[]{ ${linkFields} }
  }
`);
