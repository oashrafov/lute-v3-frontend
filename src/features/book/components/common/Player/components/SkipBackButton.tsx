import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconPlayerSkipBackFilled } from "@tabler/icons-react";
import { usePlayerContext } from "../hooks/usePlayerContext";

interface SkipBackButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function SkipBackButton(props: SkipBackButton) {
  const { player } = usePlayerContext();

  function handleSkipBack() {
    player.currentTime = 0;
  }

  return (
    <ActionIcon
      onClick={handleSkipBack}
      radius="50%"
      p={4}
      size={22}
      {...props}>
      <IconPlayerSkipBackFilled />
    </ActionIcon>
  );
}
