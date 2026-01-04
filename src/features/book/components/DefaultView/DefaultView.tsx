import { HorizontalPanels } from "./components/ResizablePanels/HorizontalPanels";
import { TermPane } from "./components/TermPane";
import { PagePane } from "./components/PagePane/PagePane";

export function DefaultView() {
  return (
    <HorizontalPanels leftPanel={<PagePane />} rightPanel={<TermPane />} />
  );
}
