import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import { useView } from "#book/hooks/useView";

export function EditButton() {
  const { clearActiveTerm } = useActiveTermContext();
  const { setView } = useView();

  function handleClick() {
    clearActiveTerm();
    setView("edit");
  }

  return (
    <ActionIcon onClick={handleClick} size={24} p={0} variant="subtle">
      <IconEdit size={22} />
    </ActionIcon>
  );
}
