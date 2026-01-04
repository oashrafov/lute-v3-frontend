import { useState } from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionIcon, Collapse, Stack } from "@mantine/core";
import {
  IconBookDownload,
  IconHeading,
  IconWorldWww,
} from "@tabler/icons-react";
import { Textarea } from "#common/Textarea/Textarea";
import { TextInput } from "#common/TextInput/TextInput";
import { BookURLInput } from "./BookURLInput";
import { BookFileInput } from "./BookFileInput";
import type { CreateBookForm } from "#book/api/types";

export function BookContentFields() {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CreateBookForm>();
  const { textDirectionMap } = useRouteContext({ from: "__root__" });
  const textDirection = textDirectionMap[getValues().languageId];
  const [visibleInput, setVisibleInput] = useState<"file" | "url" | null>(null);

  const generateContentButtons = (
    <Stack gap={2}>
      <ActionIcon
        variant={visibleInput === "file" ? "light" : "subtle"}
        onClick={() => setVisibleInput((v) => (v === "file" ? null : "file"))}>
        <IconBookDownload />
      </ActionIcon>
      <ActionIcon
        variant={visibleInput === "url" ? "light" : "subtle"}
        onClick={() => setVisibleInput((v) => (v === "url" ? null : "url"))}>
        <IconWorldWww />
      </ActionIcon>
    </Stack>
  );

  return (
    <>
      <TextInput
        name="title"
        control={control}
        label={t("titleLabel")}
        wrapperProps={{ dir: textDirection }}
        required
        withAsterisk
        leftSection={<IconHeading />}
        error={errors.title?.message}
      />
      <Textarea
        name="text"
        control={control}
        label={t("textLabel")}
        description={t("textDescription")}
        wrapperProps={{ dir: textDirection }}
        required
        withAsterisk
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        resize="vertical"
        autosize
        minRows={10}
        maxRows={20}
        leftSection={generateContentButtons}
        leftSectionProps={{ style: { alignItems: "flex-start", top: 7 } }}
        error={errors.text?.message}
      />
      <Collapse in={visibleInput === "file"}>
        <BookFileInput />
      </Collapse>
      <Collapse in={visibleInput === "url"}>
        <BookURLInput />
      </Collapse>
    </>
  );
}
