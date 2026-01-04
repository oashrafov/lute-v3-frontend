import type { Dispatch, SetStateAction } from "react";
import { Button, Chip, Group } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IconPlus } from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import { TermActions } from "./TermActions";
import { TableTopToolbar } from "#common/TableTopToolbar/TableTopToolbar";
import { TableTopToolbarDefaultItems } from "#common/TableTopToolbarDefaultItems/TableTopToolbarDefaultItems";
import type { TermsListItem } from "#term/api/types";

interface TopToolbar {
  table: MRT_TableInstance<TermsListItem>;
  showParentsOnly: boolean;
  onShowParentsOnly: Dispatch<SetStateAction<boolean>>;
  onSetEditModalOpened: (state: boolean) => void;
  showNewTermButton: boolean;
}

export function TopToolbar({
  table,
  showParentsOnly,
  onShowParentsOnly,
  onSetEditModalOpened,
  showNewTermButton,
}: TopToolbar) {
  return (
    <TableTopToolbar>
      <Group gap={5} wrap="nowrap">
        {showNewTermButton && (
          <Button
            color="green"
            size="xs"
            leftSection={<IconPlus size={22} />}
            renderRoot={(props) => <Link to="/terms/create-new" {...props} />}>
            New
          </Button>
        )}
        <TermActions
          table={table}
          onSetEditModalOpened={onSetEditModalOpened}
        />
      </Group>
      <Group wrap="nowrap">
        <Chip
          checked={showParentsOnly}
          onChange={onShowParentsOnly}
          size="xs"
          style={{ alignSelf: "center" }}>
          Show parents only
        </Chip>
        <TableTopToolbarDefaultItems table={table} />
      </Group>
    </TableTopToolbar>
  );
}
