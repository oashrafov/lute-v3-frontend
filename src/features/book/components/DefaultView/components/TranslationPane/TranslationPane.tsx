import { useRef } from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Box, ScrollAreaAutosize } from "@mantine/core";
import { VerticalPanels } from "../ResizablePanels/VerticalPanels";
import { DictsPane } from "#language/components/DictsPane/DictsPane";
import { TermInfoPane } from "#book/components/TermInfoPane/TermInfoPane";
import type { TermForm } from "#term/api/types";
import { query } from "#language/api/query";
import classes from "./TranslationPane.module.css";

interface TranslationPane {
  term: TermForm;
}

export function TranslationPane({ term }: TranslationPane) {
  const { langId } = useRouteContext({
    from: "/books/$bookId/pages/$pageNum/",
  });
  const { data: language } = useSuspenseQuery(query.detail(langId));
  const translationFieldRef = useRef<HTMLTextAreaElement>(null);

  function handleReturnFocusToForm() {
    setTimeout(() => {
      const input = translationFieldRef?.current;
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  return (
    <div className={classes.container}>
      <VerticalPanels
        topPanel={
          <ScrollAreaAutosize mah="100%">
            <TermInfoPane
              key={term.text}
              term={term}
              translationFieldRef={translationFieldRef}
              showPronunciationField={language.showPronunciation}
            />
          </ScrollAreaAutosize>
        }
        bottomPanel={
          <Box display="flex" h="100%">
            <Box className={classes.dictTabsContainer}>
              <DictsPane
                dictionaries={language.dictionaries.filter(
                  (dict) => dict.usedFor === "terms"
                )}
                termText={term.text}
                onReturnFocusToForm={handleReturnFocusToForm}
              />
            </Box>
          </Box>
        }
      />
    </div>
  );
}
