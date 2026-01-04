import type { ReactNode } from "react";
import { ActionIcon, Group } from "@mantine/core";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";

interface DraggableContainer {
  id: UniqueIdentifier;
  children: ReactNode;
}

export function DraggableContainer({ id, children }: DraggableContainer) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  return (
    <Group
      mb={5}
      gap="xs"
      wrap="nowrap"
      justify="space-between"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}>
      <ActionIcon variant="transparent" c="dark" {...listeners}>
        <IconGripVertical />
      </ActionIcon>
      {children}
    </Group>
  );
}
