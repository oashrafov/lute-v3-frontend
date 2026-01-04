import { Chip, Tooltip, type ChipProps } from "@mantine/core";

export function ShowDictionariesChip(props: Omit<ChipProps, "children">) {
  return (
    <Tooltip label="Show dictionaries for active term" refProp="rootRef">
      <Chip {...props}>Show dictionaries</Chip>
    </Tooltip>
  );
}
