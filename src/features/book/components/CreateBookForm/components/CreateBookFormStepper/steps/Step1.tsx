import { useController, useFormContext } from "react-hook-form";
import { Center, Group } from "@mantine/core";
import { LanguageSelect } from "#language/components/LanguageSelect/LanguageSelect";
import { OpenLanguageFormButton } from "../../OpenLanguageFormButton";
import type { CreateBookForm } from "#book/api/types";

export function Step1() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateBookForm>();

  const {
    field: { onChange, value, ref, ...rest },
  } = useController({ control, name: "languageId" });

  function handleLanguageChange(id: string | null) {
    if (id) {
      onChange(Number(id));
    }
  }

  return (
    <Center>
      <LanguageSelect
        onChange={handleLanguageChange}
        value={value ? String(value) : ""}
        required
        withAsterisk
        error={errors.languageId?.message}
        {...rest}
        inputContainer={(input) => (
          <Group gap={5}>
            {input}
            <OpenLanguageFormButton
              mb={errors.languageId?.message ? 5 : undefined}
            />
          </Group>
        )}
      />
    </Center>
  );
}
