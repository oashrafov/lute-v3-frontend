import { useState } from "react";
import { Button, Menu, Modal, rem } from "@mantine/core";
import {
  IconDownload,
  IconEdit,
  IconFileText,
  IconListCheck,
  IconTrashFilled,
  IconUpload,
} from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import { TermImportForm } from "./TermImportForm";
import { API_BASE_URL } from "#resources/constants";
import type { TermsListItem } from "#term/api/types";

interface TermActions {
  table: MRT_TableInstance<TermsListItem>;
  onSetEditModalOpened: (state: boolean) => void;
}

export function TermActions({ table, onSetEditModalOpened }: TermActions) {
  const [importOpen, setImportOpen] = useState(false);
  const iconSize = { width: rem(16), height: rem(16) };
  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <Button size="xs">Actions</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Edit</Menu.Label>
          <Menu.Item
            onClick={() => onSetEditModalOpened(true)}
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            leftSection={<IconEdit style={iconSize} />}>
            Edit selected
          </Menu.Item>
          <Menu.Item
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            leftSection={<IconTrashFilled style={iconSize} />}>
            Delete selected
          </Menu.Item>

          <Menu.Label>Export</Menu.Label>
          {/* //export all data that is currently in the table (ignore pagination, */}
          {/* sorting, filtering, etc.) */}
          <Menu.Item
            component="a"
            href={`${API_BASE_URL}/terms/export`}
            leftSection={<IconUpload style={iconSize} />}>
            All
          </Menu.Item>
          {/* //export all rows as seen on the screen (respects pagination, sorting, */}
          {/* filtering, etc.) */}
          <Menu.Item
            disabled={table.getRowModel().rows.length === 0}
            // onClick={() => handleExportRows(table.getRowModel().rows)}
            leftSection={<IconFileText style={iconSize} />}>
            Page
          </Menu.Item>
          <Menu.Item
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            leftSection={<IconListCheck style={iconSize} />}>
            Selected
          </Menu.Item>

          <Menu.Label>Import</Menu.Label>
          <Menu.Item
            onClick={() => setImportOpen(true)}
            leftSection={<IconDownload style={iconSize} />}>
            Import terms (CSV)
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={importOpen}
        onClose={() => setImportOpen(false)}
        title="Import terms">
        <TermImportForm />
      </Modal>
    </>
  );
}
