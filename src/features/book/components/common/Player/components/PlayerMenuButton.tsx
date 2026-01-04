import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ActionIcon } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export const PlayerMenuButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(function PlayerMenuButton(props, ref) {
  return (
    <ActionIcon
      ref={ref}
      size={24}
      p={0}
      variant="transparent"
      styles={{
        root: { background: "transparent" },
      }}
      {...props}>
      <IconChevronDown />
    </ActionIcon>
  );
});
