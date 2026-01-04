import { Tabs, type TabsTabProps } from "@mantine/core";
import classes from "../DictsPane.module.css";

export function Tab(props: TabsTabProps) {
  const { children, ...rest } = props;
  return (
    <Tabs.Tab className={classes.flex} {...rest}>
      {children}
    </Tabs.Tab>
  );
}
