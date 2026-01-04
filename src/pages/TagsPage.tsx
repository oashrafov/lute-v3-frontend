import { PageTitle } from "#common/PageTitle/PageTitle";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { TagsTable } from "#term/components/TagsTable/TagsTable";

export function TagsPage() {
  return (
    <PageContainer>
      <PageTitle>Tags</PageTitle>
      <TagsTable />
    </PageContainer>
  );
}
