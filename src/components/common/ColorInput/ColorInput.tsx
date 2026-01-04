import {
  ColorInput as MantineColorInput,
  type ColorInputProps,
} from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface ColorInput<T extends FieldValues> extends ColorInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function ColorInput<T extends FieldValues>({
  name,
  control,
  ...props
}: ColorInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineColorInput
          {...field}
          {...props}
          onChange={(v) => {
            props.onChange?.(v);
            field.onChange(v);
          }}
        />
      )}
    />
  );
}
