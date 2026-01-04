import type { Dispatch, SetStateAction } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArchive,
  IconArchiveOff,
  IconDots,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import type { MRT_Row } from "mantine-react-table";
import { deleteBookConfirm } from "#resources/modals";
import type { BooksListItem, EditAction } from "#book/api/types";
import type { Shelf } from "#book/resources/types";
import { mutation } from "#book/api/mutation";

interface ActionsCell {
  row: MRT_Row<BooksListItem>;
  onEditedRow: Dispatch<SetStateAction<MRT_Row<BooksListItem> | null>>;
  onSetShelf: Dispatch<SetStateAction<Shelf>>;
}

export function ActionsCell({ row, onEditedRow, onSetShelf }: ActionsCell) {
  const { mutate: editMutate } = mutation.useEditBook();
  const { mutate: deleteMutate } = mutation.useDeleteBook();

  function handleEdit(id: number, data: EditAction) {
    editMutate(
      { id, data },
      {
        onSuccess: (response) => {
          if (response.archivedCount === 0) {
            onSetShelf("active");
          }
        },
      }
    );
  }

  function handleOpenDeleteModal() {
    modals.openConfirmModal(
      deleteBookConfirm(row.original.title, () => deleteMutate(row.original.id))
    );
  }

  return (
    <Menu shadow="sm">
      <Menu.Target>
        <ActionIcon size="sm" variant="subtle" display="block">
          <IconDots color="var(--mantine-color-dimmed)" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="blue"
          leftSection={<IconEdit size={20} />}
          onClick={() => onEditedRow(row)}>
          Edit
        </Menu.Item>
        {row.original.isArchived ? (
          <Menu.Item
            color="orange"
            leftSection={<IconArchiveOff size={20} />}
            onClick={() =>
              handleEdit(row.original.id, { action: "unarchive" })
            }>
            Unarchive
          </Menu.Item>
        ) : (
          <Menu.Item
            color="orange"
            leftSection={<IconArchive size={20} />}
            onClick={() => handleEdit(row.original.id, { action: "archive" })}>
            Archive
          </Menu.Item>
        )}
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={20} />}
          onClick={handleOpenDeleteModal}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
