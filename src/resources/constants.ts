import env from "#utils/env";
import type { HighlightType, Status } from "./types";

export const BACKEND_URL = env.VITE_BACKEND_URL;
export const API_BASE_URL = `${BACKEND_URL}/api`;
export const DOCS_URL = "https://luteorg.github.io/lute-manual/";
export const DISCORD_URL = "https://discord.gg/CzFUQP5m8u";
export const DOWNLOAD_BACKUP_URL = `${BACKEND_URL}/backup/download/`;
export const MANUAL_BACKUP_URL = `${BACKEND_URL}/backup/backup?type=manual`;
export const FAVICON_SOURCE_URL = "http://www.google.com/s2/favicons?domain=";
export const MAX_VISIBLE_DICT_TABS = 5;
export const MAX_TERM_SUGGESTIONS = 15;
export const TERM_SUGGESTION_STR_MAX_LEN = 70;
export const MIN_LANGUAGE_DICTS = 2;
export const TABLE_PAGE_SIZE = 10;
export const AUDIO_SKIP_VALUES = [3, 5, 10, 30, 60];
export const CSS_VAR = {
  fontSize: "--lute-text-font-size",
  lineHeight: "--lute-text-line-height",
  columnCount: "--lute-text-column-count",
  textWidth: "--lute-text-width",
} as const;
export const TEXTITEM_CLASS = {
  textitem: "textitem",
  word: "word",
  marked: "marked",
  hovered: "hovered",
  selected: "selected",
  flashing: "flash",
  overlapped: "overlapped",
  bookmarked: "bookmarked",
  ghosted: "ghosted",
  selectionStart: "selection-start",
  selectionEnd: "selection-end",
} as const;
export const TEXTITEM_DATASET = {
  status: "status",
  sentenceStart: "sentence-start",
  sentenceId: "sentence-id",
  paragraphId: "paragraph-id",
} as const;
export const STATUS_LABEL = {
  0: "Unknown",
  1: "New",
  2: "New",
  3: "Learning",
  4: "Learning",
  5: "Learned",
  98: "Ignored",
  99: "Well Known",
} as const satisfies Record<Status, string>;
export const DEFAULT_HIGHLIGHT_TYPE: Record<Status, HighlightType> = {
  0: "bg",
  1: "bg",
  2: "bg",
  3: "bg",
  4: "bg",
  5: "bg",
  98: "none",
  99: "none",
} as const;
export const DEFAULT_TEXT_SETTINGS = {
  fontSize: 1,
  lineHeight: 1,
  columnCount: 1,
  highlights: true,
  textWidth: 50,
  highlightType: DEFAULT_HIGHLIGHT_TYPE,
} as const;
