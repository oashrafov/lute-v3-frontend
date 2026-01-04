import { ActionIcon, Tooltip } from "@mantine/core";
import type { toolbar } from "#resources/toolbar";

interface ToolbarButton {
  data: (typeof toolbar)[number][number];
}

export function ToolbarButton({ data }: ToolbarButton) {
  const { icon: Icon, label, action } = data;
  return (
    <Tooltip label={label}>
      <ActionIcon
        p={2}
        variant="light"
        onClick={(e) => {
          e.stopPropagation();
          action();
        }}>
        <Icon />
      </ActionIcon>
    </Tooltip>
  );
}
