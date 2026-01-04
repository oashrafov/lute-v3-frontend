import { useCallback, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { markTextitemsRange } from "#helpers/text";
import { setStatusForSelected, shiftStatusForSelected } from "#helpers/status";
import { handleMoveSelection } from "#helpers/interactions-desktop";
import { handleToggleHighlights } from "#helpers/page";
import { translateTextContent } from "#helpers/translation";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import { useBookContext } from "./useBookContext";
import { useView } from "./useView";
import { query } from "#settings/api/query";
import { mutation } from "#term/api/mutation";
import { getHovered, getMarked } from "#helpers/text";
import { copyUnitText } from "#helpers/copy";
import type { TextitemElement } from "#resources/types";
import type { TermForm } from "#term/api/types";

type TextResult = { text: string; textitems: TextitemElement[] };
type FnResult<T> = T | Promise<T>;

function withSelection<Args extends unknown[]>(
  fn: (selected: TextitemElement, ...args: Args) => FnResult<TextResult>,
  ...args: Args
) {
  return async () => {
    const selected = getMarked().concat(getHovered())[0];
    if (selected) {
      const { textitems } = await fn(selected, ...args);
      markTextitemsRange(textitems);
    }
  };
}

export function useShortcutCallbackMapping() {
  const { data } = useSuspenseQuery(query.shortcuts());
  const { themeForm } = useBookContext();
  const { textDirection } = useRouteContext({
    from: "/books/$bookId/pages/$pageNum/",
  });
  const { setView, toggleFocus } = useView();
  const { setActiveTerm, clearActiveTerm } = useActiveTermContext();
  const { mutate: editTerm } = mutation.useEditTerm();

  const moveCursorToPrevItem = useCallback(
    (elementType: Parameters<typeof handleMoveSelection>[0]) => () => {
      const term = handleMoveSelection(elementType, -1, textDirection);
      if (term) {
        setActiveTerm(term);
      }
    },
    [setActiveTerm, textDirection]
  );

  const moveCursorToNextItem = useCallback(
    (elementType: Parameters<typeof handleMoveSelection>[0]) => () => {
      const term = handleMoveSelection(elementType, 1, textDirection);
      if (term) {
        setActiveTerm(term);
      }
    },
    [setActiveTerm, textDirection]
  );

  const withPost = useCallback(
    <Args extends number>(
      fn: (arg: Args) => Pick<TermForm, "id" | "status">[] | undefined,
      arg: Args
    ) => {
      return () => {
        const data = fn(arg);
        if (data) {
          editTerm(data);
        }
      };
    },
    [editTerm]
  );

  return useMemo(
    () => ({
      [data.hotkey_StartHover.key]: () => {
        clearActiveTerm();
        themeForm.close();
      },
      [data.hotkey_PrevWord.key]: moveCursorToPrevItem("word"),
      [data.hotkey_NextWord.key]: moveCursorToNextItem("word"),
      [data.hotkey_PrevUnknownWord.key]: moveCursorToPrevItem("unknownWord"),
      [data.hotkey_NextUnknownWord.key]: moveCursorToNextItem("unknownWord"),
      [data.hotkey_PrevSentence.key]: moveCursorToPrevItem("sentenceStart"),
      [data.hotkey_NextSentence.key]: moveCursorToNextItem("sentenceStart"),
      [data.hotkey_CopySentence.key]: withSelection(copyUnitText, "sentence"),
      [data.hotkey_CopyPara.key]: withSelection(copyUnitText, "paragraph"),
      [data.hotkey_CopyPage.key]: withSelection(copyUnitText),
      [data.hotkey_TranslateSentence.key]: withSelection(
        translateTextContent,
        "sentence"
      ),
      [data.hotkey_TranslatePara.key]: withSelection(
        translateTextContent,
        "paragraph"
      ),
      [data.hotkey_TranslatePage.key]: withSelection(translateTextContent),

      [data.hotkey_StatusUp.key]: withPost(shiftStatusForSelected, 1),
      [data.hotkey_StatusDown.key]: withPost(shiftStatusForSelected, -1),

      [data.hotkey_Status1.key]: withPost(setStatusForSelected, 1),
      [data.hotkey_Status2.key]: withPost(setStatusForSelected, 2),
      [data.hotkey_Status3.key]: withPost(setStatusForSelected, 3),
      [data.hotkey_Status4.key]: withPost(setStatusForSelected, 4),
      [data.hotkey_Status5.key]: withPost(setStatusForSelected, 5),
      [data.hotkey_StatusIgnore.key]: withPost(setStatusForSelected, 98),
      [data.hotkey_StatusWellKnown.key]: withPost(setStatusForSelected, 99),
      [data.hotkey_DeleteTerm.key]: withPost(setStatusForSelected, 0),

      // [settings.hotkey_Bookmark.key]: () => handleAddBookmark(book),
      [data.hotkey_EditPage.key]: () => {
        setView("edit");
        clearActiveTerm();
      },
      [data.hotkey_NextTheme.key]: () => {
        themeForm.toggle();
        clearActiveTerm();
      },
      [data.hotkey_ToggleHighlight.key]: handleToggleHighlights,
      [data.hotkey_ToggleFocus.key]: toggleFocus,
    }),
    [
      data,
      clearActiveTerm,
      setView,
      themeForm,
      toggleFocus,
      moveCursorToNextItem,
      moveCursorToPrevItem,
      withPost,
    ]
  );
}
