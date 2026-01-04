import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Group,
  InputLabel,
  Pagination,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react";
import { BooksGridTopToolbar } from "./components/BooksGridTopToolbar";
import { BookCards } from "./components/BookCards";
import { TABLE_PAGE_SIZE } from "#resources/constants";
import { useMediaQuery } from "#hooks/useMediaQuery";
import { query } from "#book/api/query";
import type { Shelf } from "#book/resources/types";

const PAGINATION = {
  pageIndex: 0,
  pageSize: TABLE_PAGE_SIZE,
};

export function BooksGrid() {
  const media = useMediaQuery();

  const [shelf, setShelf] = useState<Shelf>("active");
  const [activePage, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGINATION.pageSize);
  const [activeLang, setActiveLang] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState("");
  const [sortingDirection, setSortDirection] = useState("desc");

  const searchParams = new URLSearchParams({
    shelf: shelf,
    start: `${(activePage - 1) * pageSize}`,
    size: String(pageSize),
    filters: JSON.stringify(
      activeLang ? [{ id: "language", value: activeLang }] : []
    ),
    globalFilter: globalFilter ?? "",
    sorting: JSON.stringify(
      sorting ? [{ id: sorting, desc: sortingDirection === "desc" }] : []
    ),
  });

  const { data } = useQuery(query.list(searchParams.toString()));

  if (!data) return;

  return (
    <>
      <BooksGridTopToolbar
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        shelf={shelf}
        onSetShelf={setShelf}
        sorting={sorting}
        onSetSorting={setSorting}
        sortingDirection={sortingDirection}
        onSetSortDirection={setSortDirection}
        globalFilter={globalFilter}
        onSetGlobalFilter={setGlobalFilter}
        hasArchived={data.archivedCount > 0}
      />

      <SimpleGrid cols={{ base: 1, xs: 2 }} mt={20}>
        <BookCards books={data.data} onEditSuccess={() => setShelf("active")} />
      </SimpleGrid>

      <Group justify="space-between" mt={20} style={{ rowGap: "10px" }}>
        <Group gap={10}>
          <InputLabel>Show:</InputLabel>
          <Select
            value={String(pageSize)}
            onChange={(v) => setPageSize(Number(v))}
            data={["5", "10", "15", "20", "25"]}
            allowDeselect={false}
            w={100}
          />
        </Group>
        <Pagination
          firstIcon={IconChevronLeftPipe}
          lastIcon={IconChevronRightPipe}
          withEdges={true}
          withPages={media !== "mobile"}
          styles={{
            root: { display: "flex", justifyContent: "flex-end" },
            control: { width: "36px", height: "36px" },
          }}
          total={Math.ceil(data.filteredCount / pageSize)}
          value={activePage}
          onChange={setPage}
        />
      </Group>
    </>
  );
}
