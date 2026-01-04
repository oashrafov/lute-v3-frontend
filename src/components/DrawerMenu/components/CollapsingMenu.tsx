import { useState, type ReactNode } from "react";
import { Collapse, UnstyledButton } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";
import { MenuSection } from "./MenuSection";
import classes from "../DrawerMenu.module.css";

interface CollapsingMenu {
  section: { label: string; icon: Icon };
  children?: ReactNode;
}

export function CollapsingMenu({ section, children }: CollapsingMenu) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}>
        <MenuSection
          label={section.label}
          hasLinks={true}
          opened={opened}
          icon={section.icon}
        />
      </UnstyledButton>
      <Collapse in={opened}>{children}</Collapse>
    </>
  );
}
