import { useState, type ReactNode } from "react";
import { useSearch } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { HoverCard, ScrollAreaAutosize } from "@mantine/core";
import { SentenceTextPreview } from "../SentenceTextPreview/SentenceTextPreview";
import { query } from "#book/api/query";
import type { SentenceReferenceData } from "#term/api/types";
import type { Page } from "#book/api/types";

interface SentenceReferenceHoverCard {
  children: ReactNode;
  referenceData: SentenceReferenceData;
}

export function SentenceReferenceHoverCard({
  children,
  referenceData,
}: SentenceReferenceHoverCard) {
  const queryClient = useQueryClient();
  const { textDir } = useSearch({ strict: false });
  const [pageData, setPageData] = useState<Page>();

  const queryOptions = query.page(
    referenceData.bookId,
    referenceData.pageNumber
  );

  async function handleFetchPageData() {
    setPageData(
      await queryClient.fetchQuery({
        ...queryOptions,
        queryKey: [
          ...queryOptions.queryKey,
          "sentenceId",
          referenceData.sentenceId,
        ],
      })
    );
  }

  return (
    <HoverCard width={280} shadow="md" onOpen={handleFetchPageData}>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown w={600} hidden={!pageData}>
        {pageData && textDir && (
          <ScrollAreaAutosize mah={300} type="hover">
            <SentenceTextPreview
              paragraphs={pageData.paragraphs}
              sentenceId={referenceData.sentenceId}
              textDir={textDir}
            />
          </ScrollAreaAutosize>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
