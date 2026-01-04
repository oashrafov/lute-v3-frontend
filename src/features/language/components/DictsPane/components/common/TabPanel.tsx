import type { ReactNode } from "react";
import { Tabs, type TabsPanelProps } from "@mantine/core";

interface TabPanel extends Omit<TabsPanelProps, "children"> {
  children: ReactNode;
}

export function TabPanel({ children, ...props }: TabPanel) {
  return (
    <Tabs.Panel h="100%" {...props}>
      {children}
    </Tabs.Panel>
  );
}
