import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputClearButton } from "@mantine/core";
import {
  IconCut,
  IconBracketsContain,
  IconHeadphones,
  IconLink,
  IconTags,
} from "@tabler/icons-react";
import { FileInput } from "#common/FileInput/FileInput";
import { NumberInput } from "#common/NumberInput/NumberInput";
import { Select } from "#common/Select/Select";
import { TagsInput } from "#common/TagsInput/TagsInput";
import { TextInput } from "#common/TextInput/TextInput";
import { query } from "#settings/api/query";
import type { CreateBookForm } from "#book/api/types";

export function BookExtraOptions() {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const { data: globalData } = useSuspenseQuery(query.globalData());
  const {
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateBookForm>();

  const hasAudioFile = !!watch("audioFile");
  const clearButton = hasAudioFile && (
    <InputClearButton
      onClick={() => {
        setValue("audioFile", null);
        clearErrors("audioFile");
      }}
    />
  );

  return (
    <>
      <FileInput
        name="audioFile"
        control={control}
        label={t("audioFileLabel")}
        description=".mp3, .m4a, .wav, .ogg, .opus, .aac, .flac, .webm"
        accept="audio/mpeg,audio/ogg,audio/mp4,audio/aac,audio/flac,audio/webm"
        leftSection={<IconHeadphones />}
        rightSection={clearButton}
        error={errors.audioFile?.message}
      />

      <NumberInput
        name="wordsPerPage"
        control={control}
        label={t("wordCountLabel")}
        leftSection={<IconBracketsContain />}
        min={1}
        max={1500}
        error={errors.wordsPerPage?.message}
      />

      <TextInput
        name="source"
        control={control}
        label={t("sourceURLLabel")}
        leftSection={<IconLink />}
        error={errors.source?.message}
      />

      <Select
        name="splitBy"
        control={control}
        label={t("splitLabel")}
        data={[
          { value: "paragraphs", label: t("paragraphsOption") },
          { value: "sentences", label: t("sentencesOption") },
        ]}
        leftSection={<IconCut />}
        searchable={false}
        allowDeselect={false}
        error={errors.splitBy?.message}
      />

      <TagsInput
        name="tags"
        control={control}
        label="Tags"
        data={globalData.bookTags}
        clearable
        leftSection={<IconTags />}
        error={errors.tags?.message}
      />
    </>
  );
}
