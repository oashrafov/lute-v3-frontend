import type { ForwardedRef } from "react";
import { Checkbox as MantineCheckbox, type CheckboxProps } from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Checkbox<T extends FieldValues> extends CheckboxProps {
  name: Path<T>;
  control: Control<T>;
  innerRef?: ForwardedRef<HTMLInputElement>;
}

export function Checkbox<T extends FieldValues>({
  name,
  control,
  innerRef,
  ...props
}: Checkbox<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineCheckbox
          {...props}
          {...field}
          checked={field.value}
          ref={innerRef}
        />
      )}
    />
  );
}
