import { useRef, type ReactNode } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { paneResizeStorage } from "#helpers/general";
import classes from "./ResizablePanels.module.css";

interface HorizontalPanels {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export function HorizontalPanels({ leftPanel, rightPanel }: HorizontalPanels) {
  const rightPanelRef = useRef<ImperativePanelHandle>(null);

  function onDblClickResize() {
    const panel = rightPanelRef.current;
    if (panel) {
      if (panel.getSize() < 15) {
        panel.resize(50);
      } else {
        panel.resize(5);
      }
    }
  }

  return (
    <PanelGroup
      style={{ height: "100vh" }}
      className="readpage"
      autoSaveId="Lute.horizontalSize"
      direction="horizontal"
      storage={paneResizeStorage}>
      <Panel order={1} defaultSize={50} minSize={30}>
        {leftPanel}
      </Panel>

      <PanelResizeHandle
        hitAreaMargins={{ coarse: 10, fine: 10 }}
        className={classes.resizeHandle}
        onDoubleClick={onDblClickResize}
      />

      <Panel
        ref={rightPanelRef}
        defaultSize={50}
        order={2}
        collapsible={true}
        minSize={5}>
        {rightPanel}
      </Panel>
    </PanelGroup>
  );
}
