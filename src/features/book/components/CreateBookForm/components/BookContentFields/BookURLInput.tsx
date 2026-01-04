import { Button, Group, InputClearButton } from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput } from "#common/TextInput/TextInput";
import { mutation } from "#book/api/mutation";
import type { CreateBookForm } from "#book/api/types";

export function BookURLInput() {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const {
    control,
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateBookForm>();
  const hasImportURL = !!watch("importUrl");
  const { mutate, isPending } = mutation.useGenerateContentFromURL();

  function handlePopulateFromUrl() {
    const url = getValues().importUrl;
    if (url) {
      mutate(url, { onSuccess: (data) => reset(data) });
      setValue("importUrl", "");
    }
  }

  const clearButton = hasImportURL && (
    <InputClearButton
      onClick={() => {
        setValue("importUrl", "");
        clearErrors("importUrl");
      }}
    />
  );

  return (
    <TextInput
      name="importUrl"
      control={control}
      label={t("importfromURLLabel")}
      leftSection={<IconWorldWww />}
      rightSection={clearButton}
      styles={{ wrapper: { minWidth: 0, flex: 1 } }}
      inputContainer={(input) => (
        <Group>
          {input}
          <Button
            disabled={!hasImportURL || !!errors.importUrl?.message}
            variant="filled"
            mb={errors.importUrl?.message ? 5 : undefined}
            loading={isPending}
            onClick={handlePopulateFromUrl}>
            {t("importLabel")}
          </Button>
        </Group>
      )}
      error={errors.importUrl?.message}
    />
  );
}
