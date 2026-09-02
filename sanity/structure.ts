import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { ImageIcon } from "@sanity/icons/Image";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .icon(DocumentIcon)
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Artworks")
        .icon(ImageIcon)
        .child(S.documentTypeList("artwork").title("Artworks")),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["page", "siteSettings", "artwork"].includes(listItem.getId() ?? "")
      ),
    ]);
