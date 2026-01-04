import type { MRT_RowData, MRT_TableOptions } from "mantine-react-table";

export const getDefaultTableOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  initialState: {
    density: "xs",
    showGlobalFilter: true,
    showColumnFilters: true,
  },

  paginationDisplayMode: "pages",
  positionToolbarAlertBanner: "bottom",
  positionActionsColumn: "last",
  enableStickyHeader: true,
  enableDensityToggle: false,
  enableFullScreenToggle: false,
  enableColumnActions: false,

  displayColumnDefOptions: {
    "mrt-row-select": {
      size: 1,
    },
    "mrt-row-pin": {
      size: 1,
      header: "",
    },
  },

  mantineSearchTextInputProps: {
    w: 200,
    size: "xs",
    leftSectionProps: {
      style: {
        padding: "5px",
      },
    },
  },

  mantineTableHeadProps: {
    style: { opacity: 1 },
  },

  mantineTableHeadRowProps: {
    style: { backgroundColor: "var(--mantine-color-body)" },
  },

  mantineTableBodyRowProps: {
    style: { opacity: 1 },
  },

  mantineCopyButtonProps: {
    display: "block",
  },

  mantineSelectAllCheckboxProps: {
    size: "sm",
  },

  mantineSelectCheckboxProps: {
    size: "sm",
  },

  mantinePaperProps: {
    withBorder: false,
    shadow: "none",
    style: { "--mrt-base-background-color": "initial" }, // fixes borders not visible bug in firefox
  },

  mantineTableContainerProps: {
    mah: 600,
  },

  mantineTableProps: {
    verticalSpacing: 4,
    withColumnBorders: true,
    highlightOnHover: false,
  },

  mantinePaginationProps: {
    styles: {
      control: { width: "36px", height: "36px" },
    },
  },

  mantineFilterTextInputProps: {
    size: "xs",
  },

  mantineFilterSelectProps: {
    size: "xs",
  },

  mantineFilterDateInputProps: {
    size: "xs",
    miw: 100,
    styles: { input: { height: "var(--input-height-xs)" } },
  },
});
