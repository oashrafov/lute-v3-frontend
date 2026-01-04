import { useFieldArray, type Control } from "react-hook-form";
import { Fieldset, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { DictionaryBars } from "./DictionaryBars";
import { AddDictionaryButton } from "./AddDictionaryButton";
import type { Dictionary, LanguageForm } from "#language/api/types";
const emptyDictionary: Dictionary = {
  id: null,
  usedFor: "terms",
  type: "embedded",
  url: "",
  isActive: false,
  hostname: "",
  label: "",
};

interface Dictionaries {
  control: Control<LanguageForm>;
}

export function Dictionaries({ control }: Dictionaries) {
  const { t } = useTranslation("form", { keyPrefix: "language" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dictionaries",
  });
  function handleAddDictionary() {
    append(emptyDictionary);
  }

  return (
    <Fieldset
      variant="filled"
      legend={t("dictionariesLabel")}
      styles={{ legend: { fontWeight: 500 } }}>
      <Group justify="flex-start" align="flex-start" gap={4} wrap="nowrap">
        <AddDictionaryButton onClick={handleAddDictionary} />
        <DictionaryBars
          dictionaries={fields}
          onRemove={(index: number) => remove(index)}
        />
      </Group>
    </Fieldset>
  );
}
