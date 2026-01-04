import { ActionIcon, Center, Group } from "@mantine/core";
import { IconPalette } from "@tabler/icons-react";
import { useBookContext } from "#book/hooks/useBookContext";
import { ThemeSelect } from "#common/ThemeSelect/ThemeSelect";

export function Actions() {
  const { drawer, themeForm } = useBookContext();
  return (
    <Center p={10}>
      <Group gap={5}>
        <ThemeSelect />
        <ActionIcon
          onClick={() => {
            themeForm.toggle();
            drawer.close();
          }}
          size="lg"
          variant="subtle">
          <IconPalette size="90%" />
        </ActionIcon>
      </Group>
    </Center>
  );
}
