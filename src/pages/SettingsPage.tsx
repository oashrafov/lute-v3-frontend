import { useTranslation } from "react-i18next";
import { SettingsForm } from "#settings/components/SettingsForm/SettingsForm";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";

export function SettingsPage() {
  const { t } = useTranslation("page", { keyPrefix: "settings" });
  return (
    <PageContainer w="75%">
      <PageTitle>{t("title")}</PageTitle>
      <SettingsForm />
    </PageContainer>
  );
}
