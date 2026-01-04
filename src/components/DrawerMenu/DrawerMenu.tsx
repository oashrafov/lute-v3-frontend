import { Divider, Drawer, Group, Text, type DrawerProps } from "@mantine/core";
import { NavLogo } from "#common/NavLogo/NavLogo";
import classes from "./DrawerMenu.module.css";

export function DrawerMenu({ children, ...rest }: DrawerProps) {
  return (
    <Drawer.Root classNames={{ content: classes.drawer }} size="250" {...rest}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Group justify="space-between" align="center">
            <NavLogo />
            <Text>Lute 3</Text>
          </Group>
          <Drawer.CloseButton />
        </Drawer.Header>

        <Divider />

        <Drawer.Body p={0} className={classes.drawer}>
          {children}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
