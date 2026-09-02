import { ImagesIcon } from "@sanity/icons/Images";
import { defineField, defineType } from "sanity";

export const textMedia = defineType({
  name: "textMedia",
  title: "Text / Media",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "videoSource",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "content",
      title: "Text",
      type: "blockContent",
    }),
    defineField({
      name: "mediaPosition",
      title: "Media position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: { media: "image" },
    prepare({ media }) {
      return { title: "Text / Media", media };
    },
  },
});
