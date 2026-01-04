import {
  ActionIcon,
  Tooltip,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconNote } from "@tabler/icons-react";

interface NotesButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function NotesButton(props: NotesButton) {
  return (
    <Tooltip label="Show notes">
      <ActionIcon size="md" {...props}>
        <IconNote />
      </ActionIcon>
    </Tooltip>
  );
}
