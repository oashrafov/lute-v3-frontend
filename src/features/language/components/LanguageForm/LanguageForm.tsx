import { useSuspenseQuery } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";
import { Group, LoadingOverlay, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  IconAbc,
  IconAlt,
  IconAnalyzeFilled,
  IconCut,
  IconTextDirectionRtl,
} from "@tabler/icons-react";
import { Checkbox } from "#common/Checkbox/Checkbox";
import { Select } from "#common/Select/Select";
import { TextInput } from "#common/TextInput/TextInput";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { Dictionaries } from "./components/Dictionaries";
import { PresetsMenu } from "./components/PresetsMenu";
import { usePopulateForm } from "./hooks/usePopulateForm";
import { useLanguageForm } from "./hooks/useLanguageForm";
import { query } from "#language/api/query";

export function LanguageForm() {
  const { t } = useTranslation("form", { keyPrefix: "language" });
  const { data: parsers } = useSuspenseQuery(query.parsers());
  const { methods } = useLanguageForm();
  const { control, handleSubmit, reset } = methods;
  const { isLoading } = usePopulateForm(reset);
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormProvider {...methods}>
        <Stack pos="relative" gap={8}>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Group align="flex-end" justify="space-between">
            <TextInput
              control={control}
              name="name"
              label="Name"
              w="fit-content"
            />
            <PresetsMenu />
          </Group>

          <Dictionaries control={control} />

          <Checkbox
            name="showPronunciation"
            control={control}
            label={t("pronunciationLabel")}
          />

          <Select
            control={control}
            name="textDirection"
            label={t("textDirectionLabel")}
            searchable={false}
            allowDeselect={false}
            w="fit-content"
            data={[
              { value: "ltr", label: "Left to right" },
              { value: "rtl", label: "Right to left" },
            ]}
            leftSection={<IconTextDirectionRtl />}
          />

          <Select
            name="parserType"
            control={control}
            label={t("parseLabel")}
            data={parsers}
            w="fit-content"
            searchable={false}
            allowDeselect={false}
            leftSection={<IconAnalyzeFilled />}
          />

          <TextInput
            name="characterSubstitutions"
            control={control}
            label={t("charSubsLabel")}
            leftSection={<IconAlt />}
          />

          <Group align="flex-end">
            <TextInput
              name="splitSentencesAt"
              control={control}
              label={t("splitLabel")}
              description={t("splitDescription")}
              flex={1}
              leftSection={<IconCut />}
            />
            <TextInput
              name="splitSentencesExceptions"
              control={control}
              label={t("splitExceptionsLabel")}
              flex={2}
            />
          </Group>

          <TextInput
            name="wordCharacters"
            control={control}
            label={t("wordCharsLabel")}
            description={t("wordCharsDescription")}
            leftSection={<IconAbc />}
          />

          <FormButtons />
        </Stack>
      </FormProvider>
    </form>
  );
}
