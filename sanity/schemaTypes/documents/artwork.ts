import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

import { ARTWORK_CATEGORIES } from "../../lib/categories";

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  icon: ImageIcon,
  description:
    "A single artwork. Reference it from modules like Item Grid.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used for the artwork's page URL (/artwork/…).",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) =>
        rule.integer().min(0).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: 'e.g. "120 × 90 cm"',
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description: "Medium / technique, e.g. Oil on canvas",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ARTWORK_CATEGORIES.map((category) => ({
          title: category.label,
          value: category.value,
        })),
        layout: "radio",
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "forSale",
      title: "For sale",
      type: "boolean",
      description: "Turn on for artworks that are available to buy.",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Inactive artworks are hidden anywhere they're referenced.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      category: "category",
      active: "active",
      media: "image",
    },
    prepare({ title, year, category, active, media }) {
      const subtitle = [year, category, active === false ? "Inactive" : null]
        .filter(Boolean)
        .join(" · ");
      return { title, subtitle: subtitle || undefined, media };
    },
  },
});
