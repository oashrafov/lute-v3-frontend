import type { RefObject } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Tabs } from "@mantine/core";
import { TermForm } from "#term/components/TermForm/TermForm";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import type { TermForm as TTermForm } from "#term/api/types";
import { query } from "#term/api/query";
import { TermVariationsList } from "#term/components/TermSentences/TermVariationsList/TermVariationsList";
import { PageSpinner } from "#common/PageSpinner/PageSpinner";
import { useBookQuery } from "#book/hooks/useBookQuery";

interface TermInfoPane {
  term: TTermForm;
  translationFieldRef: RefObject<HTMLTextAreaElement>;
  showPronunciationField?: boolean;
}

export function TermInfoPane({
  term,
  translationFieldRef,
  showPronunciationField,
}: TermInfoPane) {
  const { data: book } = useBookQuery();
  const { data } = useQuery(query.sentences(term.text, book.languageId));
  const { clearActiveTerm } = useActiveTermContext();

  return (
    <Tabs defaultValue="termform">
      <Tabs.List>
        <Tabs.Tab value="termform">Term</Tabs.Tab>
        <Tabs.Tab value="sentences" disabled={!data?.inflections.length}>
          Sentences
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="termform">
        <Box p={20}>
          <TermForm
            key={term.text}
            term={term}
            showPronunciation={showPronunciationField}
            translationFieldRef={translationFieldRef}
            onSubmitSuccess={clearActiveTerm}
            languageId={book.languageId}
          />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="sentences">
        <Box p={20}>
          {data?.inflections.length ? (
            <TermVariationsList data={data.inflections} />
          ) : (
            <PageSpinner />
          )}
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
}
