import type { ReactNode } from "react";
import { Group } from "@mantine/core";

export function TableTopToolbar({ children }: { children: ReactNode }) {
  return (
    <Group justify="space-between" wrap="nowrap" mb={16}>
      {children}
    </Group>
  );
}
