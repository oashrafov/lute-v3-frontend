import { PageTitle } from "#common/PageTitle/PageTitle";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { TermsTable } from "#term/components/TermsTable/TermsTable";

export function TermsPage() {
  return (
    <PageContainer>
      <PageTitle>Terms</PageTitle>
      <TermsTable />
    </PageContainer>
  );
}
