import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useBookQuery } from "./useBookQuery";
import { query } from "../api/query";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function usePrefetchPages() {
  const queryClient = useQueryClient();
  const { data: book } = useBookQuery();
  const { bookId, pageNum } = route.useParams();

  useEffect(() => {
    const nextPage = pageNum + 1;
    const prevPage = pageNum - 1;

    let pageToFetch;

    if (nextPage <= book.pageCount) {
      pageToFetch = nextPage;
    }
    if (prevPage >= 1) {
      pageToFetch = prevPage;
    }

    if (pageToFetch) {
      queryClient.prefetchQuery(query.page(bookId, pageToFetch));
    }
  }, [book.pageCount, bookId, pageNum, queryClient]);
}
