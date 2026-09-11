export type GridColumns = "1" | "2" | "3" | "4";

export const columnClasses: Record<GridColumns, string> = {
  "1": "grid-cols-1",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

// How wide one column renders at each breakpoint, given these grids always
// sit in a `max-w-5xl px-6` section with a `gap-8` between cards. Used as the
// <img> `sizes` attribute so the browser fetches a card-sized image instead
// of one sized for the full viewport (the next/image default).
const LARGE_COLUMN_PX: Record<GridColumns, number> = {
  "1": 976, // 1024 (max-w-5xl) - 48 (px-6 * 2)
  "2": 472, // (976 - 32 gap) / 2
  "3": 304, // (976 - 64 gap) / 3
  "4": 220, // (976 - 96 gap) / 4
};

export function gridItemSizes(columns: GridColumns): string {
  if (columns === "1") {
    return `(min-width: 1024px) ${LARGE_COLUMN_PX["1"]}px, calc(100vw - 48px)`;
  }
  // "2", "3" and "4" all go to 2 columns at the `sm` breakpoint (only `lg`
  // introduces a 3rd/4th column), so the sm-range estimate is the same.
  return `(min-width: 1024px) ${LARGE_COLUMN_PX[columns]}px, (min-width: 640px) 48vw, calc(100vw - 48px)`;
}
