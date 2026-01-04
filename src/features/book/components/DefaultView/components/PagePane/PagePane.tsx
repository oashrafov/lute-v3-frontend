import { Box, ScrollArea } from "@mantine/core";
import { DefaultHeader } from "../DefaultHeader/DefaultHeader";
import { ContextMenuArea } from "#book/components/ContextMenuArea/ContextMenuArea";
import { TheTextContainer } from "#book/components/TheTextContainer/TheTextContainer";
import classes from "./PagePane.module.css";

export function PagePane() {
  return (
    <Box className={classes.paneLeft}>
      <DefaultHeader />
      <ScrollArea type="scroll" flex={1}>
        <ContextMenuArea>
          <TheTextContainer />
        </ContextMenuArea>
      </ScrollArea>
    </Box>
  );
}
