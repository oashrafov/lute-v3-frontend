import { useTranslation } from "react-i18next";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { CreateLanguageModal } from "./CreateLanguageModal";
import { CreateBookForm } from "#book/components/CreateBookForm/CreateBookForm";

export function CreateBookPage() {
  const { t } = useTranslation("page", { keyPrefix: "newBook" });
  return (
    <>
      <CreateLanguageModal />
      <PageContainer w="75%">
        <PageTitle>{t("title")}</PageTitle>
        <CreateBookForm />
      </PageContainer>
    </>
  );
}
