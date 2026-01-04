import { Button } from "@mantine/core";
import {
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
} from "@tabler/icons-react";
import { usePlayerContext } from "../hooks/usePlayerContext";

interface SkipControls {
  disabled?: boolean;
}

export function SkipControls({ disabled }: SkipControls) {
  const { player, skipAmount } = usePlayerContext();

  function handleForwardRewind(amount: number) {
    player.currentTime += amount;
  }

  function handleRewind() {
    handleForwardRewind(-skipAmount);
  }

  function handleFF() {
    handleForwardRewind(skipAmount);
  }

  return (
    <Button.Group>
      <Button
        disabled={disabled}
        onClick={handleRewind}
        size="compact-xs"
        style={{
          borderRadius: "12px 0 0 12px",
          paddingRight: 10,
        }}
        leftSection={<IconPlayerTrackPrevFilled size={12} />}
      />
      <Button
        disabled={disabled}
        onClick={handleFF}
        size="compact-xs"
        style={{
          borderRadius: "0 12px 12px 0",
          paddingLeft: 10,
        }}
        rightSection={<IconPlayerTrackNextFilled size={12} />}
      />
    </Button.Group>
  );
}
