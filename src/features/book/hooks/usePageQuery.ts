import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "../api/query";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function usePageQuery() {
  const { bookId, pageNum } = route.useParams();
  return useSuspenseQuery(query.page(bookId, pageNum));
}
