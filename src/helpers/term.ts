import type { TermSuggestion } from "#term/api/types";
import { TERM_SUGGESTION_STR_MAX_LEN } from "#resources/constants";

function _createSuggestionString(suggestion: TermSuggestion) {
  const txt = decodeURIComponent(suggestion.text);
  let t = suggestion.translation ?? "";

  if (t == "") {
    return txt;
  }

  t = t.replaceAll("\n", "; ").replaceAll("\r", "");
  if (t.length >= TERM_SUGGESTION_STR_MAX_LEN) {
    t = t.substring(0, TERM_SUGGESTION_STR_MAX_LEN) + "...";
  }

  return `${txt} (${t})`;
}

export function buildSuggestionsList(suggestions: TermSuggestion[]) {
  return suggestions.map((suggestion) => ({
    value: suggestion.text,
    suggestion: _createSuggestionString(suggestion),
    status: suggestion.status,
  }));
}
