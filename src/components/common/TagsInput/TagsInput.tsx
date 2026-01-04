import {
  TagsInput as MantineTagsInput,
  type TagsInputProps,
} from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface TagsInput<T extends FieldValues> extends TagsInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function TagsInput<T extends FieldValues>({
  name,
  control,
  ...props
}: TagsInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <MantineTagsInput {...props} {...field} />}
    />
  );
}
