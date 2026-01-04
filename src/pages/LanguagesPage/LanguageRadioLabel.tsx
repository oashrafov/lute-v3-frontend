import { Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { DeleteLanguageButton } from "./DeleteLanguageButton";

export function LanguageRadioLabel() {
  const { t } = useTranslation("page", { keyPrefix: "languages" });
  return (
    <Group wrap="nowrap" gap={5} align="center">
      <Text component="span" fw={500} fz="sm">
        {t("languageCardsLabel")}
      </Text>
      <DeleteLanguageButton />
    </Group>
  );
}
