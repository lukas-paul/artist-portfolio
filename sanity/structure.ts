import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { PackageIcon } from "@sanity/icons/Package";
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
        .title("Items")
        .icon(PackageIcon)
        .child(S.documentTypeList("item").title("Items")),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["page", "siteSettings", "item"].includes(listItem.getId() ?? "")
      ),
    ]);
