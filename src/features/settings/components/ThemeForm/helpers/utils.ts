import { setTextColor } from "#helpers/general";
import {
  clearAllFlashing,
  getMatchedTextitems,
  makeFlashing,
} from "#helpers/text";
import type { HighlightType, TextitemElement } from "#resources/types";
import { TEXTITEM_DATASET } from "#resources/constants";

export interface StatusHighlight {
  key: `status${number | string}`;
  color: string;
  label: string;
  type: HighlightType;
}

export function handleGeneralHighlightChange(id: string, color: string) {
  document.documentElement.style.setProperty(
    `--lute-color-highlight-${id}`,
    color
  );
  setTextColor(id, color);
}

export function handleFlashHighlight() {
  const textitem = document.querySelector<TextitemElement>(
    `[data-${TEXTITEM_DATASET.sentenceId}="0"]`
  )!;
  makeFlashing(getMatchedTextitems(textitem, "sentence"));
  clearAllFlashing();
}

export function handleStatusHighlightChange(
  highlight: StatusHighlight,
  color: string
) {
  document.documentElement.style.setProperty(
    `--lute-color-highlight-${highlight.key}`,
    color
  );
  setTextColor(String(highlight.key), color);
}
