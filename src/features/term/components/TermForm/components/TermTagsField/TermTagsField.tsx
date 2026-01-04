import type { Control } from "react-hook-form";
import type { TagsInputProps } from "@mantine/core";
import { IconTags } from "@tabler/icons-react";
import { TagsInput } from "#common/TagsInput/TagsInput";
import type { TermForm } from "#term/api/types";
import classes from "../../TermForm.module.css";

interface TermTagsField extends Omit<TagsInputProps, "name"> {
  control: Control<TermForm>;
}

export function TermTagsField({ control, ...props }: TermTagsField) {
  return (
    <TagsInput
      name="tags"
      control={control}
      placeholder="Tags"
      maxDropdownHeight={200}
      leftSection={<IconTags size={20} />}
      leftSectionProps={{ className: classes.leftSection }}
      mb={5}
      {...props}
    />
  );
}
