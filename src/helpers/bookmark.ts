import { TEXTITEM_DATASET } from "#resources/constants";
import type { TextitemElement } from "#resources/types";
import {
  clearAllFlashing,
  getMatchedTextitems,
  getTextContent,
  makeFlashing,
} from "./text";

export function handleBookmarkSentence(textitem: TextitemElement) {
  const sentenceId = textitem.dataset.sentenceId;
  const textitems = getMatchedTextitems(textitem, "sentence");
  makeFlashing(textitems);
  clearAllFlashing();

  console.log(`POST sentence id: ${sentenceId} to db`);

  return { text: getTextContent(textitems), textitems };
}

export function handleShowBookmark(sentenceId: number) {
  const textitem = document.querySelector<TextitemElement>(
    `[data-${TEXTITEM_DATASET.sentenceId}="${sentenceId}"][data-${TEXTITEM_DATASET.sentenceStart}="true"]`
  );

  if (textitem) {
    textitem.scrollIntoView({ behavior: "smooth" });
    const matched = getMatchedTextitems(textitem, "sentence");
    setTimeout(() => makeFlashing(matched), 300);
    clearAllFlashing();
  }
}
