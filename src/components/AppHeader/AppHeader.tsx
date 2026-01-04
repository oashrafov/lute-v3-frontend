import { Box, Group, Portal, Title } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { NavLogo } from "#common/NavLogo/NavLogo";
import { NavigationBar } from "#components/NavigationBar/NavigationBar";
import { BurgerButton } from "#components/BurgerButton/BurgerButton";
import { ThemeSelect } from "#common/ThemeSelect/ThemeSelect";
import { useMediaQuery } from "#hooks/useMediaQuery";
import classes from "./AppHeader.module.css";

export function AppHeader() {
  const media = useMediaQuery();
  const pinned = useHeadroom({ fixedAt: 120 });
  return (
    <Portal>
      <Box
        component="header"
        className={classes.header}
        style={{
          transform: `translate3d(0, ${pinned ? 0 : "-110px"}, 0)`,
        }}>
        <Group wrap="nowrap">
          <NavLogo size={54} />
          <Title c="#212529" fw={600}>
            Lute
          </Title>
        </Group>
        <NavigationBar visibleFrom="md" />
        <Box ml={media === "desktop" ? undefined : "auto"}>
          <ThemeSelect />
        </Box>
        <BurgerButton hiddenFrom="md" />
      </Box>
    </Portal>
  );
}
