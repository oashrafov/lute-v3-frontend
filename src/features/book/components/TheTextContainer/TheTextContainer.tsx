import { useCallback, useEffect, type MouseEvent } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Box, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TheText } from "../TheText/TheText";
import { useActiveTermContext } from "#term/hooks/useActiveTermContext";
import { usePageQuery } from "#book/hooks/usePageQuery";
import { handleMouseUp } from "#helpers/interactions-desktop";
import { applyTextSettings } from "#helpers/general";
import type { WordElement } from "#resources/types";
import { textCopied } from "#book/resources/notifications";
import { useProcessPage } from "./hooks/useProcessPage";
import { copyToClipboard } from "#utils/utils";
import { makeBookmarked, scrollSentenceIntoView } from "#helpers/text";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function TheTextContainer() {
  const { sentenceId } = route.useSearch();
  const { textDirection } = route.useRouteContext();
  const { data: page } = usePageQuery();
  const { setActiveTerm, clearActiveTerm } = useActiveTermContext();
  const pageProcessed = useProcessPage();

  const handleSelectEnd = useCallback(
    async (e: MouseEvent<WordElement>) => {
      if (e.button !== 0) return;

      const termData = handleMouseUp(e);
      if (!termData) return;

      if (termData.type === "copy") {
        const text = await copyToClipboard(termData.data);
        if (text) {
          notifications.show(textCopied(termData.data));
        }
      } else {
        if (termData.data === null) {
          clearActiveTerm();
        } else {
          setActiveTerm(termData);
        }
      }
    },
    [clearActiveTerm, setActiveTerm]
  );

  useEffect(() => {
    if (sentenceId !== -1) {
      makeBookmarked(scrollSentenceIntoView(sentenceId)); // class is removed with mouseOut
    }
  }, [sentenceId]);

  return (
    <Box
      pos="relative"
      dir={textDirection}
      className="textcontainer"
      ref={applyTextSettings}>
      <LoadingOverlay visible={!pageProcessed} zIndex={199} />
      <TheText paragraphs={page.paragraphs} onSelectEnd={handleSelectEnd} />
    </Box>
  );
}
