import { z } from "zod";
import {
  StatusSchema,
  HighlightTypeSchema,
  TextDirectionSchema,
} from "./schemas";

export type Status = z.infer<typeof StatusSchema>;
export type HighlightType = z.infer<typeof HighlightTypeSchema>;
export type TextDirection = z.infer<typeof TextDirectionSchema>;
export type TextUnit = "sentence" | "paragraph" | "page";
export type View = "default" | "focus" | "edit";
export type LocalStorageItem =
  | "Lute.view"
  | "Lute.highlights"
  | "Lute.highlightType"
  | "Lute.fontSize"
  | "Lute.lineHeight"
  | "Lute.textWidth"
  | "Lute.columnCount"
  | "Lute.booksTable.pinnedRows";

export interface TextitemElement extends HTMLSpanElement {
  dataset: {
    order: string;
  } & DOMStringMap;
}

export interface WordElement extends TextitemElement {
  dataset: {
    langId: number;
    sentenceId: number;
    paragraphId: number;
    text: string;
    wordId: string;
    highlightType: HighlightType;
  } & DOMStringMap &
    TextitemElement["dataset"];
}
