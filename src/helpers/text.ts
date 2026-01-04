import type { MouseEvent } from "react";
import { TEXTITEM_CLASS, TEXTITEM_DATASET } from "#resources/constants";
import type { TextitemElement, TextUnit, WordElement } from "#resources/types";
import {
  addClassToElements,
  removeAllContainingClass,
  removeAllContainingClassWithTimeout,
} from "#utils/utils";

const textUnitAttr = {
  sentence: TEXTITEM_DATASET.sentenceId,
  paragraph: TEXTITEM_DATASET.paragraphId,
} as const;

function _partitionByParagraphId(textitems: TextitemElement[]) {
  const partitioned: Record<string, TextitemElement[]> = {};
  textitems.forEach((item) => {
    const id = item.dataset.paragraphId!;
    if (!partitioned[id]) {
      partitioned[id] = [];
    }
    partitioned[id].push(item);
  });
  return partitioned;
}

export function getTextContent(textitems: TextitemElement[]) {
  if (textitems.length === 0) return "";

  const paras = _partitionByParagraphId(textitems);
  const paratexts = Object.entries(paras).map(([, textitems]) => {
    const text = textitems.map((item) => item.textContent).join("");
    return text.replace(/\u200B/g, "");
  });

  return paratexts.join("\n").trim();
}

/** Get the textitems whose span_attribute value matches that of the
 * current active/hovered word.  If span_attribute is null, return
 * all. */
export function getMatchedTextitems(
  textitem: TextitemElement,
  unit?: Exclude<TextUnit, "page">
) {
  const single = getMarked();
  const multi = getMultiSelection();
  const hasSelection = single.length > 0 || multi.length > 0;

  if (!(textitem || hasSelection)) return [];

  const textitems =
    single.length > 0 ? single : multi.length > 0 ? multi : [textitem];

  if (!unit) return textitems;

  const textitemsSorted = textitems.toSorted(
    (a, b) => Number(a.dataset.order!) - Number(b.dataset.order!)
  );

  const attr = textUnitAttr[unit];
  const attrValue = textitemsSorted[0].getAttribute(`data-${attr}`);
  const selected = document.querySelectorAll<TextitemElement>(
    `.${TEXTITEM_CLASS.textitem}[data-${attr}="${attrValue}"]`
  );

  return Array.from(selected);
}

export async function markTextitemsRange(textitems: TextitemElement[]) {
  const start = getSelectionStart();
  const end = getSelectionEnd();

  makeSelectionStart(textitems[0]);
  makeSelectionEnd(textitems[textitems.length - 1]);

  makeFlashing(textitems);
  clearAllFlashing();

  if (start) makeSelectionStart(start);
  if (end) makeSelectionEnd(end);
}

export function getTextitemsInRange(startEl: WordElement, endEl: WordElement) {
  const [startord, endord] = [
    Number(startEl.dataset.order),
    Number(endEl.dataset.order),
  ].sort((a, b) => a - b);

  const selected = getTextitems().filter((textitem) => {
    const ord = Number(textitem.dataset.order);
    return ord >= startord && ord <= endord;
  });

  return selected;
}

export function scrollSentenceIntoView(id: number) {
  const textitems = getSentence(id);
  textitems[0].scrollIntoView({ behavior: "smooth" });
  return textitems;
}

export function focusActiveSentence(textitems: TextitemElement[]) {
  // make all textitems ghosted, then remove it from active sentence
  makeGhosted(getTextitems());

  const first = Number(textitems[0].dataset.sentenceId);
  const last = Number(textitems.at(-1)?.dataset.sentenceId);

  Array.from({ length: last - first + 1 }, (_, index) => first + index).forEach(
    (id) => clearGhosted(getSentence(id))
  );
}

export function resetFocusActiveSentence() {
  clearGhosted(getTextitems());
}

export function hasClickedOutsideText(e: MouseEvent) {
  const target = e.target;
  if (target instanceof HTMLElement) {
    if (!isTextitem(target) && e.button === 0) {
      return true;
    }
  }
  return false;
}

export function getMarked() {
  return Array.from(
    document.querySelectorAll<WordElement>(`.${TEXTITEM_CLASS.marked}`)
  );
}

export function getHovered() {
  return Array.from(
    document.querySelectorAll<WordElement>(`.${TEXTITEM_CLASS.hovered}`)
  );
}

export function getMultiSelection() {
  return Array.from(
    document.querySelectorAll<TextitemElement>(`.${TEXTITEM_CLASS.selected}`)
  );
}

export function getTextitems() {
  return Array.from(
    document.querySelectorAll<TextitemElement>(`.${TEXTITEM_CLASS.textitem}`)
  );
}

export function getWords() {
  return Array.from(
    document.querySelectorAll<WordElement>(`.${TEXTITEM_CLASS.word}`)
  );
}

export function clearMarked(textitem: WordElement) {
  textitem.classList.remove(TEXTITEM_CLASS.marked);
}

export function clearAllMarked() {
  removeAllContainingClass(TEXTITEM_CLASS.marked);
}

export function clearAllMultiterm() {
  removeAllContainingClass(TEXTITEM_CLASS.selected);
}

export function makeMarked(textitem: WordElement) {
  textitem.classList.add(TEXTITEM_CLASS.marked);
}

export function makeHovered(textitem: WordElement) {
  textitem.classList.add(TEXTITEM_CLASS.hovered);
}

export function clearHovered(textitem: WordElement) {
  textitem.classList.remove(TEXTITEM_CLASS.hovered);
}

export function clearAllHovered() {
  removeAllContainingClass(TEXTITEM_CLASS.hovered);
}

export function makeMultiterm(textitems: TextitemElement[]) {
  addClassToElements(textitems, TEXTITEM_CLASS.selected);
}

export function isMarked(textitem: TextitemElement) {
  return textitem.classList.contains(TEXTITEM_CLASS.marked);
}

export function isTextitem(element: HTMLElement) {
  return element.classList.contains(TEXTITEM_CLASS.textitem);
}

export function makeFlashing(textitems: TextitemElement[]) {
  addClassToElements(textitems, TEXTITEM_CLASS.flashing);
}

export function clearAllFlashing() {
  removeAllContainingClassWithTimeout(TEXTITEM_CLASS.flashing);
}

export function makeBookmarked(
  textitems: TextitemElement[] | NodeListOf<HTMLElement>
) {
  addClassToElements(textitems, TEXTITEM_CLASS.bookmarked);
}

export function clearBookmarked(
  textitems: TextitemElement[] | NodeListOf<HTMLElement>
) {
  textitems.forEach((t) => t.classList.remove(TEXTITEM_CLASS.bookmarked));
}

export function getSentence(id: number) {
  return Array.from(
    document.querySelectorAll<TextitemElement>(
      `[data-${TEXTITEM_DATASET.sentenceId}="${id}"]`
    )
  );
}

export function makeGhosted(
  textitems: TextitemElement[] | NodeListOf<HTMLElement>
) {
  addClassToElements(textitems, TEXTITEM_CLASS.ghosted);
}

export function clearGhosted(
  textitems: TextitemElement[] | NodeListOf<HTMLElement>
) {
  textitems.forEach((t) => t.classList.remove(TEXTITEM_CLASS.ghosted));
}

export function makeSelectionStart(textitem: TextitemElement) {
  clearSelectionStart();
  addClassToElements([textitem], TEXTITEM_CLASS.selectionStart);
}

export function makeSelectionEnd(textitem: TextitemElement) {
  clearSelectionEnd();
  addClassToElements([textitem], TEXTITEM_CLASS.selectionEnd);
}

export function clearSelectionStart() {
  removeAllContainingClass(TEXTITEM_CLASS.selectionStart);
}

export function clearSelectionEnd() {
  removeAllContainingClass(TEXTITEM_CLASS.selectionEnd);
}

export function getSelectionStart() {
  return document.querySelector<WordElement>(
    `.${TEXTITEM_CLASS.selectionStart}`
  );
}

export function getSelectionEnd() {
  return document.querySelector<WordElement>(`.${TEXTITEM_CLASS.selectionEnd}`);
}
