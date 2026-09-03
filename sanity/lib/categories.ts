export const ARTWORK_CATEGORIES = [
  { value: "spuren", label: "Spuren" },
  { value: "draussen", label: "Draußen" },
  { value: "stories", label: "Stories" },
] as const;

export function categoryLabel(value?: string | null) {
  return (
    ARTWORK_CATEGORIES.find((category) => category.value === value)?.label ??
    value ??
    ""
  );
}
