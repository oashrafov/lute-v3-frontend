import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import {
  ActionIcon,
  Button,
  Group,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  clearBookmarked,
  getSentence,
  makeBookmarked,
  scrollSentenceIntoView,
} from "#helpers/text";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

interface BookmarkButton {
  page: number;
  id: number;
  description: string;
}

export function BookmarkButton({ page, id, description }: BookmarkButton) {
  const navigate = route.useNavigate();
  const { bookId, pageNum } = route.useParams();

  const [isEditMode, setEditMode] = useState(false);

  function handleMouseOver() {
    if (page !== pageNum) return;
    makeBookmarked(getSentence(id));
  }

  function handleMouseOut() {
    if (page !== pageNum) return;
    clearBookmarked(getSentence(id));
  }

  function handleViewBookmark() {
    if (page !== pageNum) {
      navigate({
        params: { bookId: bookId, pageNum: page },
        search: (params) => ({ ...params, sentenceId: id }),
      });
      return;
    }
    makeBookmarked(scrollSentenceIntoView(id));
  }

  return (
    <Group gap="xs" wrap="nowrap">
      {isEditMode ? (
        <TextInput defaultValue={description} maw={120} size="xs" />
      ) : (
        <Tooltip label={description}>
          <Button
            onClick={handleViewBookmark}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            maw={120}
            variant="outline"
            size="xs">
            <Text fz="xs" lineClamp={1} ta="left">
              {description}
            </Text>
          </Button>
        </Tooltip>
      )}
      <Group gap={2} wrap="nowrap">
        <ActionIcon
          size="xs"
          variant="subtle"
          onClick={() => setEditMode((v) => !v)}>
          {isEditMode ? (
            <IconCheck color="var(--mantine-color-green-6)" />
          ) : (
            <IconEdit />
          )}
        </ActionIcon>
        <ActionIcon size="xs" variant="subtle" color="red.6">
          <IconTrash />
        </ActionIcon>
      </Group>
    </Group>
  );
}
