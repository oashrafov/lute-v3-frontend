import {
  TextInput as MantineTextInput,
  type TextInputProps,
} from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface TextInput<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function TextInput<T extends FieldValues>({
  name,
  control,
  ...props
}: TextInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <MantineTextInput {...props} {...field} />}
    />
  );
}
