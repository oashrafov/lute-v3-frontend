import type { TabsPanelProps } from "@mantine/core";
import { IFrame } from "./common/Iframe";
import { TabPanel } from "./common/TabPanel";

interface IFramePanel extends Omit<TabsPanelProps, "children"> {
  frameSrc: string;
  onFrameLoad?: () => void;
}

export function IFramePanel({ frameSrc, onFrameLoad, ...props }: IFramePanel) {
  return (
    <TabPanel {...props}>
      <IFrame src={frameSrc} onLoad={onFrameLoad} />
    </TabPanel>
  );
}
