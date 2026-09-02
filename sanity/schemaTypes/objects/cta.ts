import { LaunchIcon } from "@sanity/icons/Launch";
import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "link",
      title: "Button",
      type: "link",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "CTA", subtitle: "CTA" };
    },
  },
});
