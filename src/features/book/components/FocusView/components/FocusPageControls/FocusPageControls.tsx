import { getRouteApi } from "@tanstack/react-router";
import { ActionIcon, Stack } from "@mantine/core";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { usePageControl } from "#book/hooks/usePageControl";
import type { BookDetail } from "#book/api/types";
import { useMarkPageAsRead } from "#book/hooks/useMarkPageAsRead";
import { FloatingContainer } from "#book/components/common/FloatingContainer/FloatingContainer";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

interface FocusPageControls {
  pageCount: BookDetail["pageCount"];
  show: boolean;
}

export function FocusPageControls({ pageCount, show }: FocusPageControls) {
  const { pageNum } = route.useParams();
  const markPageAsRead = useMarkPageAsRead();
  const { goToNextPage, goToPreviousPage } = usePageControl();

  function handleMarkPageAsReadAndNavigate() {
    markPageAsRead();
    goToNextPage();
  }

  return (
    <>
      <FloatingContainer
        position={{ top: "50%", left: 20 }}
        transition="slide-right"
        show={show}
        zIndex={198}>
        <ActionIcon
          onClick={goToPreviousPage}
          disabled={pageCount === 1 || pageNum === 1}
          variant="light"
          size="xl"
          h={100}
          style={{ translate: "0 -50%" }}>
          <IconChevronLeft />
        </ActionIcon>
      </FloatingContainer>

      <FloatingContainer
        position={{ top: "50%", right: 20 }}
        transition="slide-left"
        show={show}
        zIndex={198}>
        <Stack style={{ translate: "0 -50%" }} gap={5}>
          <ActionIcon
            color="orange"
            onClick={handleMarkPageAsReadAndNavigate}
            disabled={pageCount === 1}
            variant="light"
            size="xl">
            {pageNum === pageCount ? <IconCheck /> : <IconChevronRight />}
          </ActionIcon>
          <ActionIcon
            onClick={goToNextPage}
            disabled={pageCount === 1 || pageNum === pageCount}
            variant="light"
            size="xl"
            h={100}>
            <IconChevronRight />
          </ActionIcon>
        </Stack>
      </FloatingContainer>
    </>
  );
}
