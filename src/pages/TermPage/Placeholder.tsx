import { Paper, Text } from "@mantine/core";

export function Placeholder({ label }: { label: string }) {
  return (
    <Paper
      flex={0.3}
      h={600}
      shadow="xs"
      withBorder
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
    </Paper>
  );
}
