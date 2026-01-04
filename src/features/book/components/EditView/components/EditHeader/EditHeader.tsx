import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconFileArrowLeft,
  IconFileArrowRight,
  IconFileCheck,
  IconFileXFilled,
} from "@tabler/icons-react";
import { PageCounter } from "#book/components/common/PageCounter";
import { useView } from "#book/hooks/useView";
import { useBookQuery } from "#book/hooks/useBookQuery";

export function EditHeader() {
  const { data: book } = useBookQuery();
  const { setView } = useView();
  function handleAddBefore() {}
  function handleAddAfter() {}
  function handleDelete() {}
  function handleSave() {
    handleExitEdit();
  }
  function handleExitEdit() {
    setView("default");
  }

  return (
    <Paper
      withBorder={false}
      radius={0}
      shadow="sm"
      style={{ padding: "1rem 2rem" }}
      classNames={{ root: "readpage" }}>
      <Group justify="space-between" wrap="nowrap" mb={10}>
        <span>
          Editing:{" "}
          <Text
            display="inline"
            component="h1"
            fw={500}
            fz="inherit"
            lineClamp={1}>
            {book.title}
          </Text>
        </span>
        <Group gap={2} wrap="nowrap" align="center">
          <PageCounter pageCount={book.pageCount} />
          <Tooltip label="Delete this page" position="right">
            <ActionIcon
              size="sm"
              variant="transparent"
              color="red"
              onClick={handleDelete}>
              <IconFileXFilled />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Group gap="xs" justify="space-between" wrap="nowrap">
        <Button
          onClick={handleAddBefore}
          size="xs"
          leftSection={<IconFileArrowLeft />}>
          Add page before
        </Button>
        <Stack gap={5}>
          <Group gap={5} justify="center" wrap="nowrap">
            <Button
              color="green"
              onClick={handleSave}
              size="xs"
              leftSection={<IconFileCheck />}>
              Save
            </Button>
            <Button variant="subtle" onClick={handleExitEdit} size="xs">
              Cancel
            </Button>
          </Group>
        </Stack>
        <Button
          onClick={handleAddAfter}
          size="xs"
          rightSection={<IconFileArrowRight />}>
          Add page after
        </Button>
      </Group>
    </Paper>
  );
}
