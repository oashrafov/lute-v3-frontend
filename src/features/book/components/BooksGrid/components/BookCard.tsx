import { Link } from "@tanstack/react-router";
import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArchiveFilled,
  IconArchiveOff,
  IconChevronDown,
  IconCircleCheckFilled,
  IconHeadphonesFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { StatsChart } from "./StatsChart";
import { TagsGroup } from "#common/TagsGroup/TagsGroup";
import { deleteBookConfirm } from "#resources/modals";
import { mutation } from "#book/api/mutation";
import type { EditAction, BooksListItem } from "#book/api/types";

interface BookCard {
  book: BooksListItem;
  onEditSuccess: () => void;
}

export function BookCard({ book, onEditSuccess }: BookCard) {
  const { mutate: deleteMutate } = mutation.useDeleteBook();
  const { mutate: editMutate } = mutation.useEditBook();

  function handleEdit(data: EditAction) {
    editMutate(
      {
        id: book.id,
        data: data,
      },
      {
        onSuccess: (response) => {
          if (response.archivedCount === 0) {
            onEditSuccess();
          }
        },
      }
    );
  }

  const headphonesIcon = (
    <ThemeIcon size="xs" variant="transparent" color="dimmed" opacity="0.4">
      <IconHeadphonesFilled />
    </ThemeIcon>
  );

  const archivedIcon = (
    <ThemeIcon size="xs" variant="transparent" color="dimmed" opacity="0.4">
      <IconArchiveFilled />
    </ThemeIcon>
  );

  const pageCounter = (
    <Text component="span" size="xs" c="dimmed">
      ({book.currentPage}/{book.pageCount})
    </Text>
  );

  return (
    <Paper withBorder radius="md" p="md" pos="relative">
      <Group
        justify="space-between"
        align="flex-start"
        wrap="nowrap"
        style={{ overflow: "hidden" }}>
        <Group
          gap={5}
          wrap="nowrap"
          align="flex-start"
          style={{ overflow: "hidden" }}>
          <ThemeIcon
            style={{ alignItems: "flex-end" }}
            size="sm"
            color={book.isCompleted ? "green.6" : "dark.1"}
            variant="transparent">
            <IconCircleCheckFilled />
          </ThemeIcon>

          <div>
            <UnstyledButton
              display="block"
              renderRoot={(props) => (
                <Link
                  to="/books/$bookId/pages/$pageNum"
                  params={{ bookId: book.id, pageNum: book.currentPage }}
                  {...props}
                />
              )}>
              <Text fw={500} fz="md" lineClamp={2} mt="-4px">
                {book.title}
              </Text>
            </UnstyledButton>

            <Text fz="xs" c="dimmed">
              {book.languageName}
            </Text>

            <Box>
              {book.audioName && headphonesIcon}
              {book.isArchived && archivedIcon}
            </Box>
          </div>

          {book.currentPage > 1 &&
            book.currentPage !== book.pageCount &&
            pageCounter}
        </Group>

        <Box w={90} h={90} miw={90}>
          <StatsChart bookId={book.id} />
        </Box>

        <Menu>
          <Menu.Target>
            <ActionIcon
              pos="absolute"
              right={5}
              top={5}
              color="dimmed"
              variant="transparent"
              size="sm">
              <IconChevronDown stroke={1} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {book.isArchived ? (
              <Menu.Item
                color="orange"
                leftSection={<IconArchiveOff />}
                onClick={() => handleEdit({ action: "unarchive" })}>
                Unarchive
              </Menu.Item>
            ) : (
              <Menu.Item
                color="orange"
                leftSection={<IconArchiveFilled />}
                onClick={() => handleEdit({ action: "archive" })}>
                Archive
              </Menu.Item>
            )}
            <Menu.Item
              color="red"
              leftSection={<IconTrashFilled />}
              onClick={() =>
                modals.openConfirmModal(
                  deleteBookConfirm(book.title, () => deleteMutate(book.id))
                )
              }>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Divider mt={16} mb={16} />

      <Stack gap={5}>
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Word count
          </Text>
          <Text size="sm">{book.wordCount}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Tags
          </Text>
          <TagsGroup tags={book.tags} />
        </Group>
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Last read
          </Text>
          <Text size="sm">
            {book.lastRead && <span>{dayjs(book.lastRead).fromNow()}</span>}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
