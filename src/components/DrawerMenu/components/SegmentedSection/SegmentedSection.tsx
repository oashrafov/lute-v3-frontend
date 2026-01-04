import { useState } from "react";
import { ScrollArea, SegmentedControl } from "@mantine/core";
import { DrawerLinks } from "../DrawerLinks";
import { MenuBookList } from "../MenuBookList";
import classes from "./SegmentedSection.module.css";

export function SegmentedSection() {
  const [section, setSection] = useState("navigation");

  return (
    <>
      <SegmentedControl
        value={section}
        onChange={(value) => setSection(value)}
        transitionTimingFunction="ease"
        fullWidth
        data={[
          { label: "Navigation", value: "navigation" },
          { label: "Books", value: "books" },
        ]}
      />

      {section === "navigation" ? (
        <ScrollArea className={classes.scroll} type="never">
          <DrawerLinks />
        </ScrollArea>
      ) : (
        <MenuBookList />
      )}
    </>
  );
}
