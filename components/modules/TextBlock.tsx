import { PortableTextContent } from "@/components/ui/PortableTextContent";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { TextBlockModule } from "@/sanity/lib/types";

export function TextBlock({
  module,
  documentId,
}: {
  module: TextBlockModule;
  documentId: string;
}) {
  const root = `modules[_key=="${module._key}"]`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <PortableTextContent
        value={module.content}
        className={module.width === "wide" ? "max-w-3xl" : "max-w-xl"}
        dataSanity={dataAttr({ id: documentId, type: "page", path: `${root}.content` })}
      />
    </section>
  );
}
