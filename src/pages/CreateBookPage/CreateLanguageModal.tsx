import { getRouteApi } from "@tanstack/react-router";
import { Drawer, ScrollAreaAutosize } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { PageContainer } from "#common/PageContainer/PageContainer";
import { PageTitle } from "#common/PageTitle/PageTitle";
import { LanguageForm } from "#language/components/LanguageForm/LanguageForm";

const route = getRouteApi("/create-book");

export function CreateLanguageModal() {
  const { t } = useTranslation("page", { keyPrefix: "newBook" });
  const { langForm } = route.useSearch();
  const navigate = route.useNavigate();
  return (
    <Drawer.Root
      returnFocus
      transitionProps={{ duration: 150 }}
      opened={!!langForm}
      onClose={() =>
        navigate({ search: (prev) => ({ ...prev, langForm: false }) })
      }
      position="bottom"
      size="75%">
      <Drawer.Overlay />
      <Drawer.Content>
        <PageContainer>
          <ScrollAreaAutosize mah="100%">
            <Drawer.Header pt={32}>
              <PageTitle>{t("createLanguageModalTitle")}</PageTitle>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body>
              <LanguageForm />
            </Drawer.Body>
          </ScrollAreaAutosize>
        </PageContainer>
      </Drawer.Content>
    </Drawer.Root>
  );
}
