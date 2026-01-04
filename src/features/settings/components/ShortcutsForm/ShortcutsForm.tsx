import { type KeyboardEvent } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Fieldset, Group, InputClearButton, rem } from "@mantine/core";
import { TextInput } from "#common/TextInput/TextInput";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { getPressedKeysAsString } from "#utils/utils";
import type { ShortcutsForm } from "#settings/api/types";
import { query } from "#settings/api/query";

function getShortcutsInCategory(category: string, data: ShortcutsForm) {
  return Object.entries(data)
    .map(([id, shortcut]) => ({ ...shortcut, id: id }))
    .filter((shortcut) => shortcut.category === category);
}

export function ShortcutsForm() {
  const { data } = useSuspenseQuery(query.shortcuts());
  const { setValue, control, watch } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.key])
    ),
  });

  const categories = [
    ["Navigation", "Navigation"],
    ["Paging", "Reading"],
    ["Update status", "Status"],
    ["Copy", "Copy"],
    ["Misc", "Misc"],
  ];

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const eventAsString = getPressedKeysAsString(e);
    if (!eventAsString) return;

    setValue(e.currentTarget.name, eventAsString);
  }

  return (
    <>
      <p>
        To set a hotkey for a function, click on its text box, and then hit the
        combination of keys you&apos;d like to use. To disable any function,
        uncheck its checkbox. Click Save when done.
      </p>
      <form>
        <Group align="flex-stretch" wrap="nowrap">
          {categories.map(([key, label]) => (
            <Fieldset
              key={label}
              legend={label}
              styles={{
                legend: { fontSize: rem(20), fontWeight: 700 },
              }}>
              {getShortcutsInCategory(key, data).map((shortcut) => (
                <TextInput
                  key={shortcut.id}
                  control={control}
                  name={shortcut.id}
                  onKeyDown={handleKeyDown}
                  size="xs"
                  label={shortcut.description}
                  readOnly
                  rightSection={
                    !!watch(shortcut.id) && (
                      <InputClearButton
                        onClick={() => setValue(shortcut.id, "")}
                      />
                    )
                  }
                />
              ))}
            </Fieldset>
          ))}
        </Group>

        <FormButtons />
      </form>
    </>
  );
}
