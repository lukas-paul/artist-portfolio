"use server";

import { client } from "./client";
import { ACTIVE_ITEMS_PAGE_QUERY } from "./queries";

export async function fetchMoreActiveItems(offset: number, pageSize: number) {
  return client.fetch(ACTIVE_ITEMS_PAGE_QUERY, {
    start: offset,
    end: offset + pageSize,
  });
}
