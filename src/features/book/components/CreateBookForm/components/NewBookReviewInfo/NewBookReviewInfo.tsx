import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Paper } from "@mantine/core";
import { InfoRow } from "./InfoRow";
import { Label } from "./Label";
import { query } from "#language/api/query";
import type { CreateBookForm } from "#book/api/types";

export function NewBookReviewInfo() {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const { data: languages } = useSuspenseQuery(query.list());
  const { getValues } = useFormContext<CreateBookForm>();
  const values = getValues();
  return (
    <Paper p="lg" withBorder w="100%">
      <InfoRow>
        <Label>{`${t("titleLabel")}:`}</Label> {values.title}
      </InfoRow>
      <InfoRow>
        <Label>{`${t("languageNameLabel")}:`}</Label>
        {languages.find((lang) => lang.id === values.languageId)?.name}
      </InfoRow>
      <InfoRow>
        <Label>{`${t("wordCountLabel")}:`}</Label> {values.wordsPerPage}
      </InfoRow>
      <InfoRow>
        <Label>{`${t("splitLabel")}:`}</Label> {values.splitBy}
      </InfoRow>
      {values.source && (
        <InfoRow>
          <Label>{`${t("sourceURLLabel")}:`}</Label> {values.source}
        </InfoRow>
      )}
      {values.audioFile && (
        <InfoRow>
          <Label>{`${t("audioFileLabel")}:`}</Label> {values.audioFile.name}
        </InfoRow>
      )}
      {values.tags.length > 0 && (
        <InfoRow>
          <Label>{`${t("tagsLabel")}:`}</Label> {values.tags}
        </InfoRow>
      )}
    </Paper>
  );
}
