import {
  ActionIcon,
  Tooltip,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconSpeakerphone } from "@tabler/icons-react";

interface PronunciationButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function PronunciationButton(props: PronunciationButton) {
  return (
    <Tooltip label="Show pronunciation">
      <ActionIcon size="md" {...props}>
        <IconSpeakerphone />
      </ActionIcon>
    </Tooltip>
  );
}
