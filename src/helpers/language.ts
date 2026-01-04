export function getLookupURL(dictURL: string, term: string) {
  return dictURL.replace(/###|\[LUTE\]/, _getCleanTermString(term));
}

export function handleExternalUrl(url: string, inNewTab: boolean = false) {
  const settings = inNewTab
    ? undefined
    : "width=800, height=600, scrollbars=yes, menubar=no, resizable=yes, status=no";

  window.open(url, "otherwin", settings);
}

function _getCleanTermString(term: string) {
  // Terms are saved with zero-width space between each token;
  // remove that for dict searches.
  const zeroWidthSpace = "\u200b";
  const sqlZWS = "%E2%80%8B";
  const cleanText = term.replaceAll(zeroWidthSpace, "").replace(/\s+/g, " ");
  const searchTerm = encodeURIComponent(cleanText).replaceAll(sqlZWS, "");

  return searchTerm;
}
