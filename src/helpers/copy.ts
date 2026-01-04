import type { TextitemElement, TextUnit } from "#resources/types";
import { copyToClipboard } from "#utils/utils";
import { getMatchedTextitems, getTextitems, getTextContent } from "./text";

export async function copyUnitText(textitem: TextitemElement, unit?: TextUnit) {
  const textitems =
    unit === "page" ? getTextitems() : getMatchedTextitems(textitem, unit);

  const text = getTextContent(textitems);
  await copyToClipboard(text);

  return { text, textitems };
}
