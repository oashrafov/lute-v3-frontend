import type { ReactNode } from "react";
import { Text } from "@mantine/core";

interface InfoRow {
  children: ReactNode;
}

export function InfoRow({ children }: InfoRow) {
  return (
    <Text display="flex" style={{ justifyContent: "space-between", gap: 16 }}>
      {children}
    </Text>
  );
}
