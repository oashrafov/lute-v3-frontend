import {
  ActionIcon,
  Tooltip,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconVocabulary } from "@tabler/icons-react";

interface LoadDictsButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function LoadDictsButton(props: LoadDictsButton) {
  return (
    <Tooltip label="Load dictionaries with the term">
      <ActionIcon variant="subtle" {...props}>
        <IconVocabulary />
      </ActionIcon>
    </Tooltip>
  );
}
