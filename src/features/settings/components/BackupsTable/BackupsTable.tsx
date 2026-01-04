import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { TableTopToolbar } from "#common/TableTopToolbar/TableTopToolbar";
import { getDefaultTableOptions } from "#resources/table-options-default";
import { DOWNLOAD_BACKUP_URL, MANUAL_BACKUP_URL } from "#resources/constants";
import { query } from "#settings/api/query";
import type { Backup } from "#settings/api/types";

const defaultOptions = getDefaultTableOptions<Backup>();

const columns: MRT_ColumnDef<Backup>[] = [
  {
    accessorKey: "name",
    header: "FILE NAME",
    Cell: ({ row }) => (
      <Tooltip label="Download">
        <Button
          c="inherit"
          fw="normal"
          size="compact-sm"
          variant="subtle"
          component="a"
          href={`${DOWNLOAD_BACKUP_URL}${row.original.name}`}>
          {row.original.name}
        </Button>
      </Tooltip>
    ),
  },
  {
    accessorKey: "size",
    header: "FILE SIZE",
  },
  {
    accessorKey: "lastModified",
    header: "LAST MODIFIED",
  },
];

export function BackupsTable() {
  const { data } = useSuspenseQuery(query.backups());

  const table = useMantineReactTable({
    ...defaultOptions,
    columns,
    data: data.backups,

    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,

    renderTopToolbar: () => (
      <TableTopToolbar>
        <Button
          component="a"
          color="green"
          size="xs"
          href={MANUAL_BACKUP_URL}
          leftSection={<IconPlus size={22} />}>
          New
        </Button>
        <Text
          component="p"
          size="sm"
          p={5}>{`Backups directory: ${data.directory}`}</Text>
      </TableTopToolbar>
    ),
  });

  return <MantineReactTable table={table} />;
}
