import type { Dispatch, SetStateAction } from "react";
import { Divider, Group, Paper, Stack } from "@mantine/core";
import { MarkRestAsKnownButton } from "#book/components/common/MarkRestAsKnownButton/MarkRestAsKnownButton";
import { ShowDictionariesChip } from "./ShowDictionariesChip";
import { FocusToolbar } from "../FocusToolbar/FocusToolbar";
import { FocusBookmarksButton } from "../FocusBookmarksButton";
import type { Bookmarks } from "#book/api/types";

interface FocusActions {
  bookmarks: Bookmarks | null;
  showDicts: boolean;
  onShowDicts: Dispatch<SetStateAction<boolean>>;
}

export function FocusActions({
  bookmarks,
  showDicts,
  onShowDicts,
}: FocusActions) {
  return (
    <Paper shadow="md" withBorder radius={10} p={10}>
      <Stack gap={10}>
        <Group wrap="nowrap" gap={5} justify="center">
          <MarkRestAsKnownButton />
          <FocusBookmarksButton bookmarks={bookmarks} />
        </Group>

        <Divider />

        <FocusToolbar />

        <Divider />

        <ShowDictionariesChip
          checked={showDicts}
          onChange={() => onShowDicts((v) => !v)}
        />
      </Stack>
    </Paper>
  );
}
