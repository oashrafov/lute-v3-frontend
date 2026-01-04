import { useSuspenseQuery } from "@tanstack/react-query";
import { Box } from "@mantine/core";
import { BooksTable } from "#book/components/BooksTable/BooksTable";
import { BooksGrid } from "#book/components/BooksGrid/BooksGrid";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { DemoNotice } from "#components/DemoNotice/DemoNotice";
import { WelcomeAlert } from "#components/WelcomeAlert/WelcomeAlert";
import { useMediaQuery } from "#hooks/useMediaQuery";
import { query } from "#settings/api/query";

export function HomePage() {
  const media = useMediaQuery();
  const { data } = useSuspenseQuery(query.globalData());
  return (
    <>
      {/* after user wipes off or deactivates demo mode tutorialBookId is set to null */}
      {data.tutorialBookId && (
        <Box px={20} pb={10}>
          <DemoNotice tutorialBookId={data.tutorialBookId} />
        </Box>
      )}

      {!data.hasLanguages && <WelcomeAlert />}

      {data.hasBooks && (
        <PageContainer>
          <PageTitle>Books</PageTitle>
          {!media || media === "desktop" ? <BooksTable /> : <BooksGrid />}
        </PageContainer>
      )}
    </>
  );
}
