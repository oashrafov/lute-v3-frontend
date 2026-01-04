import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Modal } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconPlus } from "@tabler/icons-react";
import { NewTagForm } from "./components/NewTagForm";
import { TableTopToolbar } from "#common/TableTopToolbar/TableTopToolbar";
import { TableTopToolbarDefaultItems } from "#common/TableTopToolbarDefaultItems/TableTopToolbarDefaultItems";
import { getDefaultTableOptions } from "#resources/table-options-default";
import { columnDefinition } from "./columnDefinition";
import { query } from "#term/api/query";
import type { Tag } from "#term/api/types";

const defaultOptions = getDefaultTableOptions<Tag>();

export function TagsTable() {
  const { data } = useSuspenseQuery(query.tags());
  const [openCreateTagModal, setOpenCreateTagModal] = useState(false);
  const columns = useMemo(() => columnDefinition(), []);

  const table = useMantineReactTable({
    ...defaultOptions,

    columns: columns,
    data: data,

    initialState: {
      ...defaultOptions.initialState,

      columnFilterFns: {
        text: "contains",
        termCount: "equals",
        comment: "contains",
      },
      columnVisibility: {
        "mrt-row-actions": false,
      },
    },

    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    enableColumnFilterModes: true,
    enableEditing: true,
    editDisplayMode: "row",

    renderTopToolbar: ({ table }) => (
      <TableTopToolbar>
        <Button
          color="green"
          size="xs"
          onClick={() => setOpenCreateTagModal(true)}
          leftSection={<IconPlus size={22} />}>
          New
        </Button>
        <TableTopToolbarDefaultItems table={table} />
      </TableTopToolbar>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Modal
        trapFocus
        opened={openCreateTagModal}
        onClose={() => setOpenCreateTagModal(false)}
        title="Create new term tag"
        withCloseButton>
        <NewTagForm />
      </Modal>
    </>
  );
}
