import { Tabs, type TabsProps } from "@mantine/core";
import classes from "../DictsPane.module.css";

export function DictsTabs(props: TabsProps) {
  const { children, ...rest } = props;
  return (
    <Tabs
      dir="ltr"
      classNames={{ root: classes.tabs }}
      styles={{
        tab: { paddingBlock: "xs" },
        tabLabel: { minWidth: 0 },
      }}
      {...rest}>
      {children}
    </Tabs>
  );
}
