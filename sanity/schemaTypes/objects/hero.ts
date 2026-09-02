import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "slides",
      title: "Slides",
      description:
        "Up to 4. With more than one slide the hero becomes a slider. Headline, text and call to action are optional per slide — leave them empty to use the hero's own values below.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          title: "Slide",
          icon: ImageIcon,
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              description: "Optional — falls back to the hero headline.",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              description: "Optional — falls back to the hero text.",
            }),
            defineField({
              name: "link",
              title: "Call to action",
              type: "link",
              description: "Optional — falls back to the hero call to action.",
            }),
          ],
          preview: {
            select: { title: "headline", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Slide", media };
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
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
    select: { title: "headline", media: "slides.0.image" },
    prepare({ title, media }) {
      return { title: title || "Stage / Hero", subtitle: "Stage / Hero", media };
    },
  },
});
