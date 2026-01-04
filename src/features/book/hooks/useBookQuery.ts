import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { query } from "../api/query";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function useBookQuery() {
  const { bookId } = route.useParams();
  return useSuspenseQuery(query.detail(bookId));
}
