import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, SegmentedControl } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_PaginationState,
  type MRT_SortingState,
  type MRT_ColumnFilterFnsState,
  type MRT_ColumnFiltersState,
  type MRT_Row,
} from "mantine-react-table";
import type { RowPinningState, Updater } from "@tanstack/react-table";
import { IconPin, IconPinnedOff } from "@tabler/icons-react";
import { EditBookModal } from "./components/EditBookModal";
import { EmptyRow } from "#common/EmptyRow/EmptyRow";
import { TableTopToolbar } from "#common/TableTopToolbar/TableTopToolbar";
import { TableTopToolbarDefaultItems } from "#common/TableTopToolbarDefaultItems/TableTopToolbarDefaultItems";
import { BookActions } from "./components/BookActions";
import { getDefaultTableOptions } from "#resources/table-options-default";
import { useColumnDefinition } from "./columnDefinition";
import { setLocalStorageItem, getFromLocalStorage } from "#helpers/general";
import { TABLE_PAGE_SIZE } from "#resources/constants";
import { query } from "#book/api/query";
import type { BooksListItem } from "#book/api/types";
import type { Shelf } from "#book/resources/types";

type RowPinning = { top?: string[]; bottom?: string[] };

const icons = {
  IconPinned: () => <IconPin />,
  IconX: () => <IconPinnedOff />,
};

const defaultOptions = getDefaultTableOptions<BooksListItem>();

const PAGINATION = {
  pageIndex: 0,
  pageSize: TABLE_PAGE_SIZE,
};

const COLUMN_FILTER_FNS = {
  title: "contains",
  languageName: "contains",
  wordCount: "greaterThan",
  status: "greaterThan",
};

export const BooksTable = memo(function BooksTable() {
  const [editedRow, setEditedRow] = useState<MRT_Row<BooksListItem> | null>(
    null
  );
  const [rowPinning, setRowPinning] = useState<RowPinning>(() =>
    getFromLocalStorage("Lute.booksTable.pinnedRows", { top: [], bottom: [] })
  );

  function handleRowPinning(updater: Updater<RowPinningState>) {
    setRowPinning((prev) => {
      const res = typeof updater === "function" ? updater(prev) : updater;
      setLocalStorageItem("Lute.booksTable.pinnedRows", res);
      return res;
    });
  }

  const [shelf, setShelf] = useState<Shelf>("active");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>(PAGINATION);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(COLUMN_FILTER_FNS);

  const columns = useColumnDefinition(setColumnFilters, setEditedRow, setShelf);

  const searchParams = new URLSearchParams({
    shelf: shelf,
    pinned: JSON.stringify(rowPinning),
    start: `${pagination.pageIndex * pagination.pageSize}`,
    size: `${pagination.pageSize}`,
    filters: JSON.stringify(columnFilters ?? []),
    filterModes: JSON.stringify(columnFilterFns ?? {}),
    globalFilter: globalFilter ?? "",
    sorting: JSON.stringify(sorting ?? []),
  });

  const { data: books } = useQuery(query.list(searchParams.toString()));

  const table = useMantineReactTable({
    ...defaultOptions,

    columns: columns,
    data: books?.data ?? [],
    rowCount: books?.filteredCount,

    initialState: {
      ...defaultOptions.initialState,
      columnVisibility: {
        tags: false,
      },
    },

    state: {
      columnFilterFns,
      columnFilters,
      globalFilter,
      pagination,
      sorting,
      rowPinning,
    },

    icons,

    enableColumnFilterModes: true,
    enableRowPinning: true,
    rowPinningDisplayMode: "top",

    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowPinningChange: handleRowPinning,

    getRowId: (row) => String(row.id),

    renderEmptyRowsFallback: ({ table }) => {
      const language = table
        .getColumn("languageName")
        .getFilterValue() as string;
      const isLanguageFiltered = language?.length > 0;
      return isLanguageFiltered ? (
        <EmptyRow tableName="books" language={language} />
      ) : null;
    },

    renderBottomToolbarCustomActions: () => (
      <Box pl={5}>
        <SegmentedControl
          size="sm"
          value={shelf}
          onChange={(val) => setShelf(val as Shelf)}
          data={[
            { label: "Active", value: "active" },
            {
              label: "All",
              value: "all",
              disabled: books?.archivedCount === 0,
            },
            {
              label: "Archived",
              value: "archived",
              disabled: books?.archivedCount === 0,
            },
          ]}
        />
      </Box>
    ),

    renderTopToolbar: ({ table }) => (
      <TableTopToolbar>
        <BookActions table={table} />
        <TableTopToolbarDefaultItems table={table} />
      </TableTopToolbar>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
      <EditBookModal
        opened={!!editedRow}
        book={editedRow && editedRow.original}
        onClose={() => setEditedRow(null)}
      />
    </>
  );
});
