import { UlistIcon } from "@sanity/icons/Ulist";
import { defineArrayMember, defineField, defineType } from "sanity";

export const accordion = defineType({
  name: "accordion",
  title: "Accordion",
  type: "object",
  icon: UlistIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "accordionItem",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "blockContent",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "Accordion",
        subtitle: `${items?.length || 0} item(s)`,
      };
    },
  },
});
