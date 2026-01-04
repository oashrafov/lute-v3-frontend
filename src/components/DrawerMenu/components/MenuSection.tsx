import { Box, Group, rem, ThemeIcon } from "@mantine/core";
import { IconChevronDown, type Icon } from "@tabler/icons-react";
import classes from "../DrawerMenu.module.css";

interface MenuSection {
  label: string;
  icon: Icon;
  hasLinks?: boolean;
  opened?: boolean;
}

export function MenuSection({
  label,
  hasLinks,
  opened,
  icon: Icon,
}: MenuSection) {
  return (
    <Group justify="space-between" gap={0}>
      <Group gap={0}>
        <ThemeIcon size={30}>
          <Icon style={{ width: rem(18), height: rem(18) }} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Group>
      {hasLinks && (
        <IconChevronDown
          className={classes.chevron}
          stroke={1.5}
          style={{
            width: rem(16),
            height: rem(16),
            transform: opened ? "rotate(-180deg)" : "none",
          }}
        />
      )}
    </Group>
  );
}
