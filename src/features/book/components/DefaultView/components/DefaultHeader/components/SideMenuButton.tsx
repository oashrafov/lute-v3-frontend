import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useBookContext } from "#book/hooks/useBookContext";

export function SideMenuButton() {
  const { drawer } = useBookContext();
  return (
    <ActionIcon onClick={drawer.open} size="md" variant="subtle">
      <IconMenu2 />
    </ActionIcon>
  );
}
