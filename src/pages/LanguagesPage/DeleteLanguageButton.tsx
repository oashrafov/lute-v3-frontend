import { useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { modals } from "@mantine/modals";
import { IconSquareRoundedMinusFilled } from "@tabler/icons-react";
import { deleteLanguageConfirm } from "#resources/modals";
import { query } from "#settings/api/query";

export function DeleteLanguageButton() {
  const { t } = useTranslation("page", { keyPrefix: "languages" });
  const { langId } = useSearch({ from: "/languages" });
  const { data: initial } = useSuspenseQuery(query.globalData());
  const selectedLangName = initial.languageChoices.filter(
    (lang) => lang.id === langId
  )[0]?.name;

  function handleClick() {
    if (selectedLangName) {
      modals.openConfirmModal(
        deleteLanguageConfirm(selectedLangName, () => {})
      );
    }
  }

  return (
    <Tooltip label={t("deleteLangLabel")}>
      <ActionIcon
        variant="transparent"
        color="red"
        onClick={handleClick}
        size="sm"
        style={{ backgroundColor: "transparent" }}
        disabled={!selectedLangName}>
        <IconSquareRoundedMinusFilled />
      </ActionIcon>
    </Tooltip>
  );
}
