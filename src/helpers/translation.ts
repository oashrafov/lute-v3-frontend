import type { TextitemElement, TextUnit } from "#resources/types";
import { getMatchedTextitems, getTextContent } from "./text";

export function translateTextContent(
  textitem: TextitemElement,
  unit?: Exclude<TextUnit, "page">
) {
  const textitems = getMatchedTextitems(textitem, unit);
  const text = getTextContent(textitems);
  showTextTranslation(text, [], false);

  return { text, textitems };
}

// LUTE_USER_SETTINGS.open_popup_in_new_tab
function showTextTranslation(text: string, dicts: string[], newTab: boolean) {
  if (text == "") return;

  if (dicts.length == 0) {
    console.log("No sentence translation uris configured.");
    return;
  }

  const dict_index = _get_translation_dict_index(text, dicts);
  const userdict = dicts[dict_index];

  const lookup = encodeURIComponent(text);
  const url = userdict.replace("###", lookup);
  if (url[0] == "*") {
    const finalurl = url.substring(1); // drop first char.
    const settings = newTab
      ? undefined
      : "width=800, height=600, scrollbars=yes, menubar=no, resizable=yes, status=no";

    window.open(finalurl, "dictwin", settings);
  } else {
    // top.frames.wordframe.location.href = url;
    // $("#read_pane_right").css("grid-template-rows", "1fr 0");
  }
}

// LUTE_SENTENCE_LOOKUP_URIS is rendered in templates/read/index.html.
// Hitting "t" repeatedly cycles through the uris.  Moving to a new
// sentence resets the order.

let LUTE_LAST_SENTENCE_TRANSLATION_TEXT = "";
let LUTE_CURR_SENTENCE_TRANSLATION_DICT_INDEX = 0;

/** Cycle through the LUTE_SENTENCE_LOOKUP_URIS.
 * If the current sentence is the same as the last translation,
 * move to the next sentence dictionary; otherwise start the cycle
 * again (from index 0).
 */
const _get_translation_dict_index = function (
  sentence: string,
  dicts: string[]
) {
  const dict_count = dicts.length;
  if (dict_count == 0) return 0;
  let new_index = LUTE_CURR_SENTENCE_TRANSLATION_DICT_INDEX;
  if (LUTE_LAST_SENTENCE_TRANSLATION_TEXT != sentence) {
    // New sentence, start at beginning.
    new_index = 0;
  } else {
    // Same sentence, next dict.
    new_index += 1;
    if (new_index >= dict_count) new_index = 0;
  }
  LUTE_LAST_SENTENCE_TRANSLATION_TEXT = sentence;
  LUTE_CURR_SENTENCE_TRANSLATION_DICT_INDEX = new_index;
  return new_index;
};
