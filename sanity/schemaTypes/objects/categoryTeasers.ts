import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";

import { ARTWORK_CATEGORIES, categoryLabel } from "../../lib/categories";

export const categoryTeasers = defineType({
  name: "categoryTeasers",
  title: "Category teasers",
  type: "object",
  icon: ThLargeIcon,
  description:
    "Three teasers, one per artwork category, each linking to that category's page.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "teasers",
      title: "Teasers",
      type: "array",
      validation: (rule) =>
        rule.max(3).custom((teasers) => {
          const categories = (teasers as { category?: string }[] | undefined)
            ?.map((teaser) => teaser?.category)
            .filter(Boolean);
          if (categories && new Set(categories).size !== categories.length) {
            return "Each category can only be used once";
          }
          return true;
        }),
      of: [
        defineArrayMember({
          type: "object",
          name: "categoryTeaser",
          fields: [
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
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { category: "category", media: "image" },
            prepare({ category, media }) {
              return { title: categoryLabel(category) || "Category teaser", media };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { heading: "heading", teasers: "teasers" },
    prepare({ heading, teasers }) {
      return {
        title: heading || "Category teasers",
        subtitle: `${teasers?.length || 0} teaser(s)`,
      };
    },
  },
});
