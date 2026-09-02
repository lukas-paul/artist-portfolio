"use server";

import { client } from "./client";
import { ACTIVE_ARTWORKS_PAGE_QUERY } from "./queries";

export type ArtworkFilters = {
  category: string;
  forSaleOnly: boolean;
};

export async function fetchMoreActiveArtworks(
  offset: number,
  pageSize: number,
  filters: ArtworkFilters
) {
  return client.fetch(ACTIVE_ARTWORKS_PAGE_QUERY, {
    start: offset,
    end: offset + pageSize,
    category: filters.category,
    forSaleOnly: filters.forSaleOnly,
  });
}
