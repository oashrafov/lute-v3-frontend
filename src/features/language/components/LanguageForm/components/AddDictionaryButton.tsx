import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

interface AddDictionaryButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function AddDictionaryButton(props: AddDictionaryButton) {
  return (
    <ActionIcon variant="transparent" color="green.6" {...props}>
      <IconSquareRoundedPlusFilled />
    </ActionIcon>
  );
}
