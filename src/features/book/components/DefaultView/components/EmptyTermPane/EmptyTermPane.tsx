import { Center, Stack } from "@mantine/core";
import {
  IconHandClick,
  IconCursorText,
  IconEdit,
  IconCopy,
  IconMouse2,
} from "@tabler/icons-react";
import { Row } from "./Row";

export function EmptyTermPane() {
  return (
    <Center h="100%" style={{ userSelect: "none" }}>
      <Stack c="dimmed" gap="lg">
        <Stack gap={0}>
          <Row label="Click on a word to see term info" icon={IconHandClick} />
          <Row
            label="Click hold and drag for multi-word selection"
            icon={IconCursorText}
          />
          <Row label="Hold shift and click for bulk editing" icon={IconEdit} />
          <Row label="Hold shift and drag to copy" icon={IconCopy} />
          <Row
            label="Right click on page pane for context menu"
            icon={IconMouse2}
          />
        </Stack>
        <Stack gap={0}>
          <Row label="Deselect" icon="Esc" />
          <Row label="Toggle word highlights" icon="H" />
          <Row label="Toggle Focus Mode" icon="F" />
        </Stack>
      </Stack>
    </Center>
  );
}
