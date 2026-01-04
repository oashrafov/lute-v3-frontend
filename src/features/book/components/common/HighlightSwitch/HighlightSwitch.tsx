import { IconHighlight } from "@tabler/icons-react";
import { ModeSwitch } from "../ModeSwitch/ModeSwitch";
import { handleSetHighlights } from "#helpers/page";
import { getFromLocalStorage } from "#helpers/general";

export function HighlightsSwitch() {
  return (
    <ModeSwitch
      label="Highlights"
      icon={IconHighlight}
      id="highlightsSwitch"
      defaultChecked={getFromLocalStorage("Lute.highlights", true)}
      onChange={(e) => handleSetHighlights(e.currentTarget.checked)}
    />
  );
}
