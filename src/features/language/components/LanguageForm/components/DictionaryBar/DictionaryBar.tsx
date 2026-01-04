import { Tooltip } from "@mantine/core";
import type { Control } from "react-hook-form";
import { TextInput } from "#common/TextInput/TextInput";
import { Checkbox } from "#common/Checkbox/Checkbox";
import { Select } from "#common/Select/Select";
import { TestDictionaryButton } from "./components/TestDictionaryButton";
import type { Dictionary, LanguageForm } from "#language/api/types";

export interface DictionaryBar {
  control: Control<LanguageForm>;
  name: `dictionaries.${number}`;
  dict: Dictionary;
  editable: boolean;
}

export function DictionaryBar({
  name,
  dict,
  control,
  editable,
}: DictionaryBar) {
  return (
    <>
      <Tooltip
        label="Is active?"
        openDelay={300}
        withinPortal={false}
        refProp="innerRef">
        <Checkbox
          name={`${name}.isActive`}
          control={control}
          size="xs"
          disabled={!editable}
        />
      </Tooltip>

      <TextInput
        name={`${name}.url`}
        control={control}
        flex={5}
        size="xs"
        placeholder="Dictionary URL"
        rightSection={
          dict.url.length > 0 && (
            <TestDictionaryButton
              src={dict.url.replace("###", "test").replace("[LUTE]", "test")}
            />
          )
        }
      />

      <Tooltip
        label="Use for"
        openDelay={300}
        withinPortal={false}
        refProp="innerRef">
        <Select
          name={`${name}.usedFor`}
          control={control}
          aria-label="Use dictionary for"
          size="xs"
          data={[
            { label: "Terms", value: "terms" },
            { label: "Sentences", value: "sentences" },
          ]}
        />
      </Tooltip>

      <Tooltip
        label="Show as"
        openDelay={300}
        withinPortal={false}
        refProp="innerRef">
        <Select
          name={`${name}.type`}
          control={control}
          aria-label="Show dictionary as"
          size="xs"
          data={[
            { label: "Embedded", value: "embedded" },
            { label: "Pop-up", value: "popup" },
          ]}
        />
      </Tooltip>
    </>
  );
}
