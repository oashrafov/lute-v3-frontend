import { getRouteApi } from "@tanstack/react-router";
import { useBookQuery } from "./useBookQuery";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function usePageControl(onNavigate?: (num: number) => void) {
  const { pageNum } = route.useParams();
  const navigate = route.useNavigate();

  const { data: book } = useBookQuery();

  function goToPage(num: number) {
    if (num > book.pageCount || num < 1) return;

    navigate({ params: { bookId: book.id, pageNum: num }, search: true });
    onNavigate?.(num);
  }

  function goToNextPage() {
    goToPage(pageNum + 1);
  }

  function goToPreviousPage() {
    goToPage(pageNum - 1);
  }

  return {
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
}
