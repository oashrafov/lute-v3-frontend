import { isLightColor } from "@mantine/core";
import {
  CSS_VAR,
  DEFAULT_TEXT_SETTINGS,
  TEXTITEM_DATASET,
} from "#resources/constants";
import {
  type HighlightType,
  type LocalStorageItem,
  type WordElement,
} from "#resources/types";

export function setTextColor(id: string, color: string) {
  document.documentElement.style.setProperty(
    `--lute-text-color-${id}`,
    isLightColor(color)
      ? "var(--mantine-color-dark-7)"
      : "var(--mantine-color-dark-0)"
  );
}

export function getTextContainer() {
  return document.querySelector<HTMLDivElement>(".textcontainer");
}

export function setTextSetting(setting: keyof typeof CSS_VAR, value: string) {
  getTextContainer()?.style.setProperty(CSS_VAR[setting], value);
}

export function applyTextSettings(node: HTMLDivElement) {
  if (node !== null) {
    node.dataset.showHighlights = text.highlights() ? "true" : "false";

    const fontSize = text.fontSize();
    const lineHeight = text.lineHeight();
    const columnCount = text.columnCount();
    node.style.setProperty(CSS_VAR["fontSize"], `${fontSize}rem`);
    node.style.setProperty(CSS_VAR["lineHeight"], `${lineHeight}px`);
    node.style.setProperty(CSS_VAR["columnCount"], String(columnCount));
    if (getFromLocalStorage("Lute.view", "default") === "focus") {
      const textWidth = text.textWidth();
      node.style.setProperty(CSS_VAR["textWidth"], `${textWidth}%`);
    }

    Object.entries(text.highlightType()).map(([, value]) =>
      document
        .querySelectorAll<WordElement>(
          `[data-${TEXTITEM_DATASET.status}="${value}"]`
        )
        .forEach(
          (word) => (word.dataset.highlightType = value as HighlightType)
        )
    );
  }
}

export const text = {
  fontSize: () =>
    getFromLocalStorage("Lute.fontSize", DEFAULT_TEXT_SETTINGS.fontSize),
  lineHeight: () =>
    getFromLocalStorage("Lute.lineHeight", DEFAULT_TEXT_SETTINGS.lineHeight),
  columnCount: () =>
    getFromLocalStorage("Lute.columnCount", DEFAULT_TEXT_SETTINGS.columnCount),
  highlights: () =>
    getFromLocalStorage("Lute.highlights", DEFAULT_TEXT_SETTINGS.highlights),
  highlightType: () =>
    getFromLocalStorage(
      "Lute.highlightType",
      DEFAULT_TEXT_SETTINGS.highlightType
    ),
  textWidth: () =>
    getFromLocalStorage("Lute.textWidth", DEFAULT_TEXT_SETTINGS.textWidth),
};

export const paneResizeStorage = (() => {
  function strip(name: string) {
    return name.replace("react-resizable-panels:", "");
  }

  return {
    getItem(name: string) {
      return JSON.parse(localStorage.getItem(strip(name))!);
    },
    setItem(name: string, value: string) {
      localStorage.setItem(strip(name), JSON.stringify(value));
    },
  };
})();

export function getFromLocalStorage<K extends LocalStorageItem>(
  item: K,
  defaultVal?: unknown
) {
  const storageVal = JSON.parse(localStorage.getItem(item)!);

  if (storageVal === null || Object.is(storageVal, NaN)) {
    return defaultVal;
  } else {
    return storageVal;
  }
}

export function setLocalStorageItem<K extends LocalStorageItem>(
  key: K,
  value: unknown
) {
  localStorage.setItem(key, JSON.stringify(value));
}
