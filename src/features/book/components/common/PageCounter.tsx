import { getRouteApi } from "@tanstack/react-router";
import { Badge } from "@mantine/core";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

interface PageCounter {
  pageCount: number;
}

export function PageCounter({ pageCount }: PageCounter) {
  const { pageNum } = route.useParams();
  return (
    <Badge ml="auto" variant="light" fw={600} miw="max-content">
      {pageNum} / {pageCount}
    </Badge>
  );
}
