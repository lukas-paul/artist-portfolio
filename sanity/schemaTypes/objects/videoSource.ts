import { VideoIcon } from "@sanity/icons/Video";
import { defineField, defineType } from "sanity";

export const videoSource = defineType({
  name: "videoSource",
  title: "Video",
  type: "object",
  icon: VideoIcon,
  fields: [
    defineField({
      name: "sourceType",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Upload a file", value: "upload" },
          { title: "YouTube / Vimeo URL", value: "url" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "file",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.sourceType !== "upload",
    }),
    defineField({
      name: "url",
      title: "Video URL",
      description: "A YouTube or Vimeo link.",
      type: "url",
      hidden: ({ parent }) => parent?.sourceType !== "url",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { sourceType?: string } | undefined;
          if (parent?.sourceType !== "url") return true;
          if (!value) return "Required";
          const isYouTubeOrVimeo =
            /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//.test(value);
          return isYouTubeOrVimeo || "Must be a YouTube or Vimeo URL";
        }),
    }),
  ],
});
