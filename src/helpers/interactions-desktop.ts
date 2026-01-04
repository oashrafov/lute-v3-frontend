import type { MouseEvent } from "react";
import {
  getTextitemsInRange,
  clearAllHovered,
  clearAllMarked,
  clearAllMultiterm,
  clearHovered,
  clearMarked,
  getMarked,
  getTextContent,
  isMarked,
  makeHovered,
  makeMarked,
  makeMultiterm,
  makeSelectionStart,
  makeSelectionEnd,
  clearSelectionStart,
  clearSelectionEnd,
} from "./text";
import type { ActiveTerm, SingleTerm } from "#term/store/activeTermContext";
import type {
  TextDirection,
  TextitemElement,
  WordElement,
} from "#resources/types";
import { TEXTITEM_CLASS, TEXTITEM_DATASET } from "#resources/constants";

let selectionStart: WordElement | null = null;
let selectionStartShiftHeld = false;
let currentTermOrder = -1;

export function startHoverMode() {
  clearAllMarked();

  const currentWord = document.querySelector<WordElement>(
    `[data-order="${currentTermOrder}"]`
  );
  if (currentWord) {
    makeHovered(currentWord);
  }

  _clearRangeSelection();
  selectionStart = null;
}
// selection started
export function handleMouseDown(e: MouseEvent) {
  if (e.button !== 0) return;

  _clearRangeSelection();
  const textitem = e.target as WordElement;
  selectionStart = textitem;
  selectionStartShiftHeld = e.shiftKey;
  currentTermOrder = Number(textitem.dataset.order);
}
// mouse over during selection or without it
export function handleMouseOver(e: MouseEvent) {
  const textitem = e.target as WordElement;
  if (selectionStart) {
    _markSelectionRange(selectionStart, textitem);
  } else {
    clearAllHovered();
    if (getMarked().length === 0) {
      makeHovered(textitem);
      currentTermOrder = Number(textitem.dataset.order);
    }
  }
}
// selection ended
export function handleMouseUp(e: MouseEvent<WordElement>): ActiveTerm {
  const textitem = e.currentTarget;
  if (selectionStart?.getAttribute("id") === textitem.getAttribute("id")) {
    return _singleWordClicked(e);
  }

  clearAllMarked();

  const selected = _markSelectionRange(selectionStart!, textitem);
  // return selected text for copy
  if (selectionStartShiftHeld) {
    const text = getTextContent(selected);
    startHoverMode();

    return { data: text, type: "copy" };
  }

  selectionStart = null;
  selectionStartShiftHeld = false;

  return {
    data: _getRangeSelectionText(selected),
    langId: Number(selected[0].dataset.langId),
    type: "multi",
    textitems: selected,
  };
}

export function handleMouseOut() {
  clearAllHovered();
}

export function handleMoveSelection(
  elementType: "word" | "unknownWord" | "sentenceStart",
  moveDirection: 1 | -1 = 1,
  textDirection: TextDirection = "ltr",
  showTermPopup?: boolean
): SingleTerm | undefined {
  const textitem = _getNextTextitem(elementType, moveDirection, textDirection);
  if (!textitem) return;

  _updateSelection(textitem);

  if (showTermPopup) {
    _showTermPopupOnHover(textitem);
  }

  if (elementType !== "word") {
    _highlightTextitem(textitem);
  }

  return {
    data: Number(textitem.dataset.wordId),
    type: "single",
    textitems: [textitem],
  };
}

function _singleWordClicked(e: MouseEvent): ActiveTerm {
  selectionStart = null;
  const textitem = e.target as WordElement;

  clearHovered(textitem);

  // If already clicked, remove the click marker.
  if (isMarked(textitem)) {
    clearMarked(textitem);

    if (getMarked().length === 0) {
      makeHovered(textitem);
      startHoverMode();
    }
    // selecting same word. sending null data for form to close
    return { data: null };
  }

  makeMarked(textitem);

  // Normal click without Shift
  if (!e.shiftKey) {
    clearAllMarked();
    makeMarked(textitem);

    return {
      data: Number(textitem.dataset.wordId),
      type: "single",
      textitems: [textitem],
    };
  } else {
    // shift clicking multiple words
    const markedTextitems = getMarked();
    if (markedTextitems.length > 0) {
      return {
        data: markedTextitems.map((item) => Number(item.dataset.wordId)),
        type: "select",
        textitems: markedTextitems,
      };
    }
  }

  // Shift click. returns null so term form doesn't do anything
  return null;
}

function _updateSelection(textitem: WordElement) {
  clearAllMarked();
  clearAllMultiterm();
  clearAllHovered();
  // for highlights in no highlights mode
  makeHovered(textitem);

  makeMarked(textitem);
  currentTermOrder = Number(textitem.dataset.order);
}

function _getFirstSelectedElementOrder() {
  const orderNumbers = Array.from(
    document.querySelectorAll<WordElement>(".marked, .selected, .hovered")
  ).map((item) => Number(item.dataset.order));

  return orderNumbers.length > 0 ? Math.min(...orderNumbers) : null;
}

function _getRangeSelectionText(selected: TextitemElement[]) {
  const textParts = selected.map((el) => el.dataset.text);
  const cleanText = textParts.join("").trim();
  return cleanText.replace(/\//g, "LUTESLASH");
}

function _clearRangeSelection() {
  clearAllMultiterm();
  clearSelectionStart();
  clearSelectionEnd();
}

function _markSelectionRange(start: WordElement, current: WordElement) {
  if (Number(start.dataset.order) < Number(current.dataset.order)) {
    makeSelectionStart(start);
    makeSelectionEnd(current);
  } else {
    makeSelectionEnd(start);
    makeSelectionStart(current);
  }

  const selected = getTextitemsInRange(start, current);
  makeMultiterm(selected);

  return selected;
}

function _getNextTextitem(
  elementType: "word" | "unknownWord" | "sentenceStart",
  moveDirection: 1 | -1,
  textDirection: TextDirection
) {
  const selectorMap = {
    unknownWord: `[data-${TEXTITEM_DATASET.status}="0"]`,
    sentenceStart: `[data-${TEXTITEM_DATASET.sentenceStart}="true"]`,
    word: `.${TEXTITEM_CLASS.word}`,
  };

  const direction =
    textDirection === "ltr" ? moveDirection : -1 * moveDirection;
  const selector = selectorMap[elementType];
  const firstElementOrder = _getFirstSelectedElementOrder() ?? 0;
  let candidates = Array.from(document.querySelectorAll<WordElement>(selector));
  let comparator = (a: number, b: number) => a > b;

  if (direction < 0) {
    candidates = candidates.reverse();
    comparator = (a, b) => a < b;
  }

  return candidates.find((element) =>
    comparator(Number(element.dataset.order), firstElementOrder)
  );
}

function _highlightTextitem(textitem: WordElement) {
  const order = Number(textitem.dataset.order);
  const className = `highlight_${order}`;
  textitem.classList.add("flash-highlight", `${className}`);
  setTimeout(
    () =>
      document
        .querySelector(`.${className}`)
        ?.classList.remove("flash-highlight", `${className}`),
    1000
  );
}

const _showTermPopupOnHover = (() => {
  let lastCursorMatch: WordElement;

  const mouseOverEvent = new MouseEvent("mouseover", { bubbles: true });
  const mouseOutEvent = new MouseEvent("mouseout", { bubbles: true });

  return (textitem: WordElement) => {
    if (lastCursorMatch) {
      lastCursorMatch.dispatchEvent(mouseOutEvent);
    }
    textitem.dispatchEvent(mouseOverEvent);
    lastCursorMatch = textitem;
  };
})();
