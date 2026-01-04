import { Button, Group, InputClearButton } from "@mantine/core";
import { IconBookDownload } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FileInput } from "#common/FileInput/FileInput";
import { mutation } from "#book/api/mutation";
import type { CreateBookForm } from "#book/api/types";

export function BookFileInput() {
  const {
    control,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateBookForm>();
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const hasTextFile = !!watch("textFile");

  const { mutate, isPending } = mutation.useParseContentFromFile();

  function handleParseFile() {
    const file = getValues().textFile;
    if (file) {
      mutate(file, {
        onSuccess: (data) => {
          setValue("text", data.text);
        },
      });
    }
  }

  const clearButton = hasTextFile && (
    <InputClearButton
      onClick={() => {
        setValue("textFile", null);
        clearErrors("textFile");
      }}
    />
  );

  return (
    <FileInput
      name="textFile"
      control={control}
      label={t("textFileLabel")}
      description=".txt, .epub, .pdf, .srt, .vtt"
      accept="text/plain, application/pdf, .epub, .srt, .vtt"
      leftSection={<IconBookDownload />}
      rightSection={clearButton}
      styles={{ wrapper: { minWidth: 0, flex: 1 } }}
      onChange={(value) => {
        if (value) {
          setValue("title", value.name.slice(0, value.name.lastIndexOf(".")));
        }
      }}
      inputContainer={(input) => (
        <Group wrap="nowrap" align="flex-end">
          {input}
          <Button
            disabled={!hasTextFile || !!errors.textFile?.message}
            variant="filled"
            loading={isPending}
            mb={errors.textFile?.message ? 5 : undefined}
            style={{ flexShrink: 0 }}
            onClick={handleParseFile}>
            {t("importLabel")}
          </Button>
        </Group>
      )}
      error={errors.textFile?.message}
    />
  );
}
