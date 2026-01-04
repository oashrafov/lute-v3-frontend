import { ScrollArea, Stack } from "@mantine/core";
import { FocusHeader } from "../FocusHeader/FocusHeader";
import { ContextMenuArea } from "#book/components/ContextMenuArea/ContextMenuArea";
import { TheTextContainer } from "#book/components/TheTextContainer/TheTextContainer";

export function FocusPagePane() {
  return (
    <Stack gap={0} h="100vh">
      <FocusHeader />
      <ScrollArea type="scroll" flex={1}>
        <ContextMenuArea>
          <TheTextContainer />
        </ContextMenuArea>
      </ScrollArea>
    </Stack>
  );
}
