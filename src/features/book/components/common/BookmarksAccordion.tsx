import { useParams } from "@tanstack/react-router";
import { Accordion, Stack, type AccordionProps } from "@mantine/core";
import { BookmarkButton } from "./BookmarkButton";
import type { Bookmarks } from "#book/api/types";

interface BookmarksAccordion extends AccordionProps {
  bookmarks: Bookmarks;
}

export function BookmarksAccordion({
  bookmarks,
  ...props
}: BookmarksAccordion) {
  const { pageNum } = useParams({ from: "/books/$bookId/pages/$pageNum/" });
  return (
    <Accordion
      variant="filled"
      miw={220}
      disableChevronRotation
      defaultValue={String(pageNum)}
      {...props}>
      {bookmarks.map(({ page, sentences }) => (
        <Accordion.Item key={page} value={String(page)}>
          <Accordion.Control fz="xs">Page {page}</Accordion.Control>
          <Accordion.Panel>
            <Stack gap={5} align="center">
              {sentences.map((sentence) => (
                <BookmarkButton
                  key={sentence.id}
                  id={sentence.id}
                  page={page}
                  description={sentence.description}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
