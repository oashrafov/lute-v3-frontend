import { ActionIcon, Group, Stack, Tooltip } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IconCsv, IconQuestionMark } from "@tabler/icons-react";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { Checkbox } from "#common/Checkbox/Checkbox";
import { FileInput } from "#common/FileInput/FileInput";

export function TermImportForm() {
  const { control } = useForm({
    defaultValues: {
      importNewOnly: false,
      setToUnknown: false,
      updateExisting: false,
      file: null,
    },
  });

  return (
    <form>
      <Stack gap={5}>
        <Checkbox
          name="importNewOnly"
          control={control}
          label="Import new terms only"
        />
        <Checkbox
          name="setToUnknown"
          control={control}
          label="Set new to Unknown"
        />
        <Checkbox
          name="updateExisting"
          control={control}
          label="Update existing"
        />
        <FileInput
          name="file"
          control={control}
          label="Browse CSV"
          accept="text/csv"
          leftSection={<IconCsv />}
          clearable
        />
      </Stack>

      <Group justify="space-between" align="center" wrap="nowrap" mt="xs">
        <Tooltip label='Go to help page for "Bulk Import"'>
          <ActionIcon
            component="a"
            href="https://luteorg.github.io/lute-manual/usage/terms/bulk-term-import.html"
            target="_blank"
            variant="light"
            radius="xl">
            <IconQuestionMark />
          </ActionIcon>
        </Tooltip>
        <FormButtons okLabel="Import" discardLabel="" mt={0} />
      </Group>
    </form>
  );
}
