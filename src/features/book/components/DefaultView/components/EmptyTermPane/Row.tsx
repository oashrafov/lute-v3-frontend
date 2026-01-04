import { Group, Kbd, Text, ThemeIcon } from "@mantine/core";
import { type Icon } from "@tabler/icons-react";

interface Row {
  label: string;
  icon: Icon | string;
}

export function Row({ label, icon: Icon }: Row) {
  return (
    <Group gap={10}>
      {typeof Icon !== "string" && (
        <ThemeIcon variant="transparent" c="inherit">
          <Icon />
        </ThemeIcon>
      )}
      <Text c="inherit">{label}</Text>
      {typeof Icon === "string" && <Kbd>{Icon}</Kbd>}
    </Group>
  );
}
