import { useRef, type MouseEvent, type ReactNode } from "react";
import { Box } from "@mantine/core";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import { hasClickedOutsideText } from "#helpers/text";

interface ContextMenuArea {
  children: ReactNode;
}

export function ContextMenuArea({ children }: ContextMenuArea) {
  const { clearActiveTerm } = useActiveTermContext();
  const contextMenuAreaRef = useRef(null);

  function handleClickOutside(e: MouseEvent) {
    const res = hasClickedOutsideText(e);
    if (!res) return;
    clearActiveTerm();
  }

  return (
    <>
      <ContextMenu areaRef={contextMenuAreaRef} />
      <Box onMouseDown={handleClickOutside} ref={contextMenuAreaRef}>
        {children}
      </Box>
    </>
  );
}
