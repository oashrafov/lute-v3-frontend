import { getRouteApi } from "@tanstack/react-router";
import { mutation } from "../api/mutation";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function useMarkPageAsRead() {
  const { bookId, pageNum } = route.useParams();
  const { mutate } = mutation.useEditBook();

  return function (markRestAsKnown: boolean = false) {
    mutate({
      id: bookId,
      data: { action: "markPageAsRead", pageNum, markRestAsKnown },
      userData: { showNotification: false },
    });
  };
}
