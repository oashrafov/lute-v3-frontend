import { clamp } from "#utils/utils";
import {
  getTextContainer,
  setTextSetting,
  setLocalStorageItem,
  getFromLocalStorage,
} from "./general";

export function handleSetHighlights(checked: boolean) {
  setLocalStorageItem("Lute.highlights", checked);
  getTextContainer()!.dataset.showHighlights = checked ? "true" : "false";
  const highlightsSwitch = document.getElementById(
    "highlightsSwitch"
  ) as HTMLInputElement;
  highlightsSwitch.checked = checked;
}

export function handleToggleHighlights() {
  const state = getFromLocalStorage("Lute.highlights", false);
  setLocalStorageItem("Lute.highlights", !state);
  getTextContainer()!.dataset.showHighlights = state ? "false" : "true";
  const highlightsSwitch = document.getElementById(
    "highlightsSwitch"
  ) as HTMLInputElement;
  highlightsSwitch.checked = !highlightsSwitch.checked;
}

export function handleSetColumnCount(count: number) {
  setLocalStorageItem("Lute.columnCount", count);
  setTextSetting("columnCount", String(count));
}

export function handleSetLineHeight(amount: number) {
  const clamped = clamp(amount, 0, 15);
  setLocalStorageItem("Lute.lineHeight", clamped);
  setTextSetting("lineHeight", `${clamped}px`);
}

export function handleSetFontSize(size: number) {
  const clamped = clamp(Number(size.toFixed(2)), 0.5, 3);
  setLocalStorageItem("Lute.fontSize", clamped);
  setTextSetting("fontSize", `${clamped}rem`);
}

export function handleSetTextWidth(width: number) {
  const clamped = clamp(Number(width.toFixed(3)), 30, 100);
  setLocalStorageItem("Lute.textWidth", clamped);
  setTextSetting("textWidth", `${clamped}%`);
}
