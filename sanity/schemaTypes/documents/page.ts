import { DocumentIcon } from "@sanity/icons/Document";
import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
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
      description: "Set to \"index\" to use this page as the homepage (served at /).",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showInNav",
      title: "Show in navigation",
      type: "boolean",
      description: "Adds this page's title to the header navigation.",
      initialValue: false,
    }),
    defineField({
      name: "navOrder",
      title: "Navigation order",
      type: "number",
      description: "Lower numbers appear first. Leave blank to sort last.",
      hidden: ({ parent }) => !parent?.showInNav,
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        defineArrayMember({ type: "hero" }),
        defineArrayMember({ type: "textBlock" }),
        defineArrayMember({ type: "textMedia" }),
        defineArrayMember({ type: "accordion" }),
        defineArrayMember({ type: "itemGrid" }),
        defineArrayMember({ type: "media" }),
        defineArrayMember({ type: "cta" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : undefined };
    },
  },
});
