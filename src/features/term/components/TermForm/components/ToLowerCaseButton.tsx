import {
  ActionIcon,
  Tooltip,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconLetterCaseLower } from "@tabler/icons-react";

interface ToLowerCaseButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function ToLowerCaseButton(props: ToLowerCaseButton) {
  return (
    <Tooltip label="Make lowercase">
      <ActionIcon size="md" variant="subtle" {...props}>
        <IconLetterCaseLower />
      </ActionIcon>
    </Tooltip>
  );
}
