import { Link } from "@tanstack/react-router";
import { Button, Group, Text, ThemeIcon } from "@mantine/core";
import {
  IconArchiveFilled,
  IconCircleCheckFilled,
  IconHeadphonesFilled,
} from "@tabler/icons-react";
import type { MRT_Row } from "mantine-react-table";
import type { BooksListItem } from "#book/api/types";

interface TitleCell {
  row: MRT_Row<BooksListItem>;
}

export function TitleCell({ row }: TitleCell) {
  const id = row.original.id;
  const title = row.original.title;
  const currentPage = row.original.currentPage;
  const pageCount = row.original.pageCount;
  const isCompleted = row.original.isCompleted;
  const isArchived = row.original.isArchived;
  const hasAudio = row.original.audioName;

  return (
    <Group gap={5} align="center" wrap="nowrap" maw={400}>
      <ThemeIcon
        size="sm"
        color={isCompleted ? "green.6" : "dark.1"}
        variant="transparent">
        <IconCircleCheckFilled />
      </ThemeIcon>
      <Button
        c="inherit"
        fw="normal"
        td="none"
        variant="subtle"
        size="compact-sm"
        renderRoot={(props) => (
          <Link
            to="/books/$bookId/pages/$pageNum"
            params={{ bookId: id, pageNum: currentPage }}
            {...props}
          />
        )}>
        {title}
      </Button>
      {currentPage > 1 && currentPage !== pageCount && (
        <Text component="span" size="xs" c="dimmed">
          ({currentPage}/{pageCount})
        </Text>
      )}
      {hasAudio && (
        <ThemeIcon size="xs" variant="transparent" color="dimmed" opacity="0.4">
          <IconHeadphonesFilled />
        </ThemeIcon>
      )}
      {isArchived && (
        <ThemeIcon size="xs" variant="transparent" color="dimmed" opacity="0.4">
          <IconArchiveFilled />
        </ThemeIcon>
      )}
    </Group>
  );
}
