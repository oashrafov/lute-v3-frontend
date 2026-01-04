import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ActionIcon } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";

export const PageActionButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & { icon: TablerIcon }
>(function PageActionButton(props, ref) {
  const { icon: Icon, ...rest } = props;
  return (
    <ActionIcon
      ref={ref}
      size={24}
      {...rest}
      variant="transparent"
      styles={{
        root: { border: "none", backgroundColor: "transparent" },
      }}>
      <Icon />
    </ActionIcon>
  );
});
