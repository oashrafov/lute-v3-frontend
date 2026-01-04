import {
  NumberInput as MantineNumberInput,
  type NumberInputProps,
} from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface NumberInput<T extends FieldValues> extends NumberInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function NumberInput<T extends FieldValues>({
  name,
  control,
  ...props
}: NumberInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <MantineNumberInput {...props} {...field} />}
    />
  );
}
