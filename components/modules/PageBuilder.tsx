import { Accordion } from "@/components/modules/Accordion";
import { CategoryTeasers } from "@/components/modules/CategoryTeasers";
import { Cta } from "@/components/modules/Cta";
import { Hero } from "@/components/modules/Hero";
import { ItemGrid } from "@/components/modules/ItemGrid";
import { Media } from "@/components/modules/Media";
import { PageHero } from "@/components/modules/PageHero";
import { TextBlock } from "@/components/modules/TextBlock";
import { TextMedia } from "@/components/modules/TextMedia";
import type { PageModule } from "@/sanity/lib/types";

export function PageBuilder({
  modules,
  documentId,
}: {
  modules?: PageModule[] | null;
  documentId: string;
}) {
  if (!modules || modules.length === 0) return null;

  return (
    <>
      {modules.map((module) => {
        switch (module._type) {
          case "hero":
            return <Hero key={module._key} module={module} documentId={documentId} />;
          case "pageHero":
            return <PageHero key={module._key} module={module} documentId={documentId} />;
          case "textBlock":
            return <TextBlock key={module._key} module={module} documentId={documentId} />;
          case "textMedia":
            return <TextMedia key={module._key} module={module} documentId={documentId} />;
          case "accordion":
            return <Accordion key={module._key} module={module} documentId={documentId} />;
          case "itemGrid":
            return <ItemGrid key={module._key} module={module} documentId={documentId} />;
          case "categoryTeasers":
            return (
              <CategoryTeasers key={module._key} module={module} documentId={documentId} />
            );
          case "media":
            return <Media key={module._key} module={module} documentId={documentId} />;
          case "cta":
            return <Cta key={module._key} module={module} documentId={documentId} />;
          default:
            return null;
        }
      })}
    </>
  );
}
