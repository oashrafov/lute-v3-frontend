import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Affix, Paper } from "@mantine/core";
import { FocusPageControls } from "./components/FocusPageControls/FocusPageControls";
import { FocusActions } from "./components/FocusActions/FocusActions";
import { FloatingContainer } from "../common/FloatingContainer/FloatingContainer";
import { FocusPagePane } from "./components/FocusPagePane/FocusPagePane";
import { DictsPane } from "#language/components/DictsPane/DictsPane";
import { TermForm } from "#term/components/TermForm/TermForm";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import { useView } from "#book/hooks/useView";
import { useBookQuery } from "#book/hooks/useBookQuery";
import { useTermQuery } from "#term/hooks/useTermQuery";
import { useBookContext } from "#book/hooks/useBookContext";
import { query } from "#language/api/query";

export function FocusView() {
  const { view } = useView();
  const { themeForm } = useBookContext();
  const { data: book } = useBookQuery();
  const { data: term } = useTermQuery();
  const { data: language } = useSuspenseQuery(query.detail(book.languageId));
  const { activeTerm } = useActiveTermContext();
  const [showDicts, setShowDicts] = useState(false);

  const show = view === "focus";
  const isTermActive =
    term && (activeTerm?.type === "single" || activeTerm?.type === "multi");
  const showThemeForm = themeForm.isOpen;
  const showTranslationPane = isTermActive && !showThemeForm;

  return (
    <>
      <FocusPagePane />

      <Affix position={{ top: 100, left: 20 }}>
        <FocusActions
          bookmarks={book.bookmarks}
          onShowDicts={setShowDicts}
          showDicts={showDicts}
        />
      </Affix>

      <FloatingContainer
        show={!!(show && showTranslationPane)}
        position={{ top: 100, right: 20 }}
        transition="slide-left">
        <Paper shadow="sm" p={10} w={300} withBorder>
          {term && (
            <TermForm
              term={term}
              showPronunciation={language.showPronunciation}
              languageId={book.languageId}
            />
          )}
        </Paper>
      </FloatingContainer>

      <FloatingContainer
        show={!!(show && showTranslationPane && showDicts)}
        position={{ bottom: 20, left: 20 }}
        transition="slide-right">
        <Paper shadow="sm" p={10} w={800} withBorder h={500}>
          {term?.text && (
            <DictsPane
              termText={term.text}
              dictionaries={language.dictionaries.filter(
                (dict) => dict.usedFor === "terms"
              )}
            />
          )}
        </Paper>
      </FloatingContainer>

      <FocusPageControls
        pageCount={book.pageCount}
        show={show && !showTranslationPane}
      />
    </>
  );
}
