import type { MRT_ColumnDef } from "mantine-react-table";
import { EditButtonsCell } from "../EditButtonsCell/EditButtonsCell";
import type { Tag } from "#term/api/types";

export const columnDefinition = (): MRT_ColumnDef<Tag>[] => [
  {
    accessorKey: "text",
    header: "TAG",
  },
  {
    accessorKey: "comment",
    header: "COMMENT",
  },
  {
    accessorKey: "termCount",
    header: "TERM COUNT",
    columnFilterModeOptions: null,
    enableEditing: false,
  },
  {
    id: "actions",
    header: "",
    columnDefType: "display",
    size: 0,
    Cell: ({ row, table }) => {
      const isEditing = table.getState().editingRow?.id === row.id;
      return <EditButtonsCell row={row} table={table} isEditing={isEditing} />;
    },
  },
];
