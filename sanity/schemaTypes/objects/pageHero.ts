import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const pageHero = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  icon: ImageIcon,
  description:
    "A centered headline hero for interior pages, at content width. Without an image it's a black headline on white; add an image and it fills the background with the headline in white.",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. When set it fills the hero and the headline turns white over a dark scrim.",
    }),
  ],
  preview: {
    select: { title: "headline", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Page hero", subtitle: "Page hero", media };
    },
  },
});
