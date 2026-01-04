import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/books/$bookId")({
  params: {
    parse: (params) => ({ bookId: Number(params.bookId) }),
  },
  beforeLoad: ({ params, location }) => {
    const shouldRedirect = [
      `/books/${params.bookId}`,
      `/books/${params.bookId}/`,
      `/books/${params.bookId}/pages`,
      `/books/${params.bookId}/pages/`,
    ].includes(location.pathname);

    if (shouldRedirect) {
      throw redirect({
        to: "/books/$bookId/pages/$pageNum",
        params: { bookId: params.bookId, pageNum: 1 },
      });
    }
  },
});
