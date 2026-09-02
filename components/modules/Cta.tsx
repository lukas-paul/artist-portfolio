import { CmsLink } from "@/components/ui/CmsLink";
import { dataAttr } from "@/sanity/lib/dataAttr";
import type { CtaModule } from "@/sanity/lib/types";

export function Cta({
  module,
  documentId,
}: {
  module: CtaModule;
  documentId: string;
}) {
  const isDark = module.background === "dark";
  const root = `modules[_key=="${module._key}"]`;
  const path = (field: string) => `${root}.${field}`;

  return (
    <section
      data-sanity={dataAttr({ id: documentId, type: "page", path: root })}
      className={isDark ? "bg-black text-white" : undefined}
    >
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2
          data-sanity={dataAttr({ id: documentId, type: "page", path: path("heading") })}
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {module.heading}
        </h2>
        {module.text && (
          <p
            data-sanity={dataAttr({ id: documentId, type: "page", path: path("text") })}
            className="mt-3 opacity-80"
          >
            {module.text}
          </p>
        )}
        <CmsLink
          link={module.link}
          className={`mt-8 inline-block border px-6 py-3 text-sm ${
            isDark
              ? "border-white hover:bg-white hover:text-black"
              : "border-black hover:bg-black hover:text-white"
          }`}
        />
      </div>
    </section>
  );
}
