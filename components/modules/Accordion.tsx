import { PortableTextContent } from "@/components/ui/PortableTextContent";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { AccordionModule } from "@/sanity/lib/types";

export function Accordion({
  module,
  documentId,
}: {
  module: AccordionModule;
  documentId: string;
}) {
  const root = `modules[_key=="${module._key}"]`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className="mx-auto max-w-3xl px-6 py-16"
    >
      {module.heading && (
        <h2
          data-sanity={dataAttr({ id: documentId, type: "page", path: `${root}.heading` })}
          className="mb-6 text-2xl font-semibold tracking-tight"
        >
          {module.heading}
        </h2>
      )}
      <div className="divide-y divide-black/10 border-y border-black/10">
        {module.items.map((item) => {
          const itemRoot = `${root}.items[_key=="${item._key}"]`;

          return (
            <details key={item._key} className="group py-4">
              <summary
                data-sanity={dataAttr({
                  id: documentId,
                  type: "page",
                  path: `${itemRoot}.title`,
                })}
                className="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                {item.title}
                <span className="ml-4 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pt-4">
                <PortableTextContent
                  value={item.content}
                  dataSanity={dataAttr({
                    id: documentId,
                    type: "page",
                    path: `${itemRoot}.content`,
                  })}
                />
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
