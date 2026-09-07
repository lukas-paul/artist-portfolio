/**
 * The image-less headline hero: a centered black headline on white, at content
 * width. Shared by the `pageHero` module (when it has no image) and the artwork
 * category pages.
 */
export function HeadlineHero({
  headline,
  dataSanityRoot,
  dataSanityHeadline,
}: {
  headline: string;
  dataSanityRoot?: string;
  dataSanityHeadline?: string;
}) {
  return (
    <section data-sanity={dataSanityRoot} className="mx-auto max-w-5xl px-6">
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <h1
          data-sanity={dataSanityHeadline}
          className="relative z-10 max-w-3xl text-center text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {headline}
        </h1>
      </div>
    </section>
  );
}
