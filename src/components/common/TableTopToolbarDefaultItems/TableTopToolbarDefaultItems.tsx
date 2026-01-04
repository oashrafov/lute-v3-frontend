import { Group } from "@mantine/core";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  type MRT_RowData,
  type MRT_TableInstance,
} from "mantine-react-table";

interface TableTopToolbarDefaultItems<T extends MRT_RowData> {
  table: MRT_TableInstance<T>;
}

export function TableTopToolbarDefaultItems<T extends MRT_RowData>({
  table,
}: TableTopToolbarDefaultItems<T>) {
  return (
    <Group wrap="nowrap" gap={5}>
      <MRT_GlobalFilterTextInput table={table} variant="default" mx={0} />
      <MRT_ShowHideColumnsButton table={table} size="input-xs" />
    </Group>
  );
}
