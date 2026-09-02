import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Stage / Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "backgroundType",
      title: "Background type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "None", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background video",
      type: "videoSource",
      hidden: ({ parent }) => parent?.backgroundType !== "video",
    }),
    defineField({
      name: "headline",
      title: "Headline",
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
      title: "Call to action",
      type: "link",
    }),
  ],
  preview: {
    select: { title: "headline", media: "backgroundImage" },
    prepare({ title, media }) {
      return { title: title || "Stage / Hero", subtitle: "Stage / Hero", media };
    },
  },
});
