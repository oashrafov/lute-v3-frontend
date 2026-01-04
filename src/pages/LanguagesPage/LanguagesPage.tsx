import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { LanguageForm } from "#language/components/LanguageForm/LanguageForm";
import { LanguageCards } from "#language/components/LanguageCards/LanguageCards";
import { query } from "#settings/api/query";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { LanguageRadioLabel } from "./LanguageRadioLabel";

export function LanguagesPage() {
  const { t } = useTranslation("page", { keyPrefix: "languages" });
  const { data } = useSuspenseQuery(query.globalData());
  return (
    <PageContainer w="75%">
      <PageTitle>{t("title")}</PageTitle>

      {data.hasLanguages && (
        <LanguageCards
          label={<LanguageRadioLabel />}
          description={t("languageCardsDescription")}
        />
      )}

      <LanguageForm />
    </PageContainer>
  );
}
