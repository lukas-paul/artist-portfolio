import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 2,
      description: "Used as the default meta description.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "footerContent",
      title: "Footer text",
      type: "blockContent",
      description:
        "Shown in the first footer column — e.g. a contact block or copyright line. Leave empty to omit.",
    }),
    defineField({
      name: "footerText",
      title: "Footer text (legacy)",
      type: "string",
      deprecated: { reason: 'Use the "Footer text" block field instead.' },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
