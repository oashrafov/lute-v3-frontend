import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { ShortcutsForm } from "#settings/components/ShortcutsForm/ShortcutsForm";

export function ShortcutsPage() {
  return (
    <PageContainer w="75%">
      <PageTitle>Keyboard shortcuts</PageTitle>
      <ShortcutsForm />
    </PageContainer>
  );
}
