import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

export const textBlock = defineType({
  name: "textBlock",
  title: "Text",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      options: {
        list: [
          { title: "Narrow", value: "narrow" },
          { title: "Wide", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "narrow",
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const firstBlock = content?.find((block: { _type: string }) => block._type === "block");
      const text = firstBlock?.children
        ?.map((child: { text: string }) => child.text)
        .join("");
      return { title: text || "Text", subtitle: "Text" };
    },
  },
});
