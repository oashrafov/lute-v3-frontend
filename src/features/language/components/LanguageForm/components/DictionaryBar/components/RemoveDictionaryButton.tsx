import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSquareRoundedMinusFilled } from "@tabler/icons-react";

interface RemoveDictionaryButton {
  disabled: boolean;
  onClick: () => void;
}

export function RemoveDictionaryButton({
  disabled,
  onClick,
}: RemoveDictionaryButton) {
  return (
    <Tooltip label="Remove dictionary" openDelay={300} withinPortal={false}>
      <ActionIcon
        disabled={disabled}
        variant="transparent"
        color="red.6"
        size="sm"
        style={{ backgroundColor: "transparent" }}
        onClick={onClick}>
        <IconSquareRoundedMinusFilled />
      </ActionIcon>
    </Tooltip>
  );
}
