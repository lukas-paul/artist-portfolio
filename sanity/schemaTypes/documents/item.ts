import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";

export const item = defineType({
  name: "item",
  title: "Item",
  type: "document",
  icon: PackageIcon,
  description:
    "A generic content entry — use it for whatever your site needs (movies, events, artworks, ...). Reference it from modules like Item Grid.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
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
      description: "Inactive items are hidden anywhere they're referenced.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", date: "date", active: "active", media: "image" },
    prepare({ title, date, active, media }) {
      const subtitle = [date, active === false ? "Inactive" : null]
        .filter(Boolean)
        .join(" · ");
      return { title, subtitle: subtitle || undefined, media };
    },
  },
});
