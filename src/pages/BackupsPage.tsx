import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { BackupsTable } from "#settings/components/BackupsTable/BackupsTable";

export function BackupsPage() {
  return (
    <PageContainer>
      <PageTitle>Backups</PageTitle>
      <BackupsTable />
    </PageContainer>
  );
}
