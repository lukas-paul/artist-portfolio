import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";

export const itemGrid = defineType({
  name: "itemGrid",
  title: "Item Grid",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "string",
      options: {
        list: [
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
        ],
        layout: "radio",
      },
      initialValue: "3",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description:
        "Manually pick items/cards below, or automatically show every active Item.",
      options: {
        list: [
          { title: "Manually selected", value: "manual" },
          { title: "All active items", value: "all-active" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),
    defineField({
      name: "pageSize",
      title: "Items per page",
      type: "number",
      description:
        "How many items load initially, and how many more load each time the visitor scrolls to the bottom.",
      initialValue: 12,
      hidden: ({ parent }) => parent?.source !== "all-active",
      validation: (rule) => rule.min(1).max(48),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          title: "Reference an Item",
          to: [{ type: "item" }],
        }),
        defineArrayMember({
          type: "object",
          name: "gridItem",
          title: "Custom card",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
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
              name: "link",
              title: "Link",
              type: "link",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        }),
      ],
      hidden: ({ parent }) => parent?.source === "all-active",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { source?: string } | undefined;
          if (parent?.source === "all-active") return true;
          return value && value.length > 0 ? true : "At least one item is required";
        }),
    }),
  ],
  preview: {
    select: { title: "heading", items: "items", source: "source" },
    prepare({ title, items, source }) {
      return {
        title: title || "Item Grid",
        subtitle:
          source === "all-active"
            ? "All active items"
            : `${items?.length || 0} item(s)`,
      };
    },
  },
});
