import { useRef, type ReactNode } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { paneResizeStorage } from "#helpers/general";
import classes from "./ResizablePanels.module.css";

interface VerticalPanels {
  topPanel: ReactNode;
  bottomPanel: ReactNode;
}

export function VerticalPanels({ topPanel, bottomPanel }: VerticalPanels) {
  const topPanelRef = useRef<ImperativePanelHandle>(null);

  function onDblClickResize() {
    const panel = topPanelRef?.current;
    if (panel) {
      if (panel.getSize() < 15) {
        panel.resize(40);
      } else {
        panel.resize(5);
      }
    }
  }

  return (
    <PanelGroup
      direction="vertical"
      autoSaveId="Lute.verticalSize"
      storage={paneResizeStorage}>
      <Panel order={1} defaultSize={40} ref={topPanelRef}>
        {topPanel}
      </Panel>

      <PanelResizeHandle
        hitAreaMargins={{ coarse: 10, fine: 10 }}
        className={classes.resizeHandle}
        onDoubleClick={onDblClickResize}
      />

      <Panel
        order={1}
        defaultSize={60}
        minSize={20}
        collapsible
        collapsedSize={0}>
        {bottomPanel}
      </Panel>
    </PanelGroup>
  );
}
