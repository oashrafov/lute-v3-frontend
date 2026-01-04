import type { ReactNode } from "react";
import { Text } from "@mantine/core";

interface Label {
  children: ReactNode;
}

export function Label({ children }: Label) {
  return (
    <Text span fw={700}>
      {children}
    </Text>
  );
}
