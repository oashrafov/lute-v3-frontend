import { ActionIcon, Group } from "@mantine/core";
import {
  IconCircleXFilled,
  IconDeviceFloppy,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import type { MRT_Row, MRT_TableInstance } from "mantine-react-table";

interface EditButtonsCell<T extends object> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  isEditing: boolean;
}

export function EditButtonsCell<T extends object>({
  row,
  table,
  isEditing,
}: EditButtonsCell<T>) {
  return isEditing ? (
    <Group wrap="nowrap" gap={5}>
      <ActionIcon
        size="sm"
        variant="transparent"
        color="red.6"
        onClick={() => table.setEditingRow(null)}>
        <IconCircleXFilled />
      </ActionIcon>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={() => table.setEditingRow(null)}>
        <IconDeviceFloppy />
      </ActionIcon>
    </Group>
  ) : (
    <Group wrap="nowrap" gap={5}>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={() => table.setEditingRow(row)}>
        <IconEdit />
      </ActionIcon>
      <ActionIcon size="sm" variant="transparent" color="red.6">
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}
