import { Select as MantineSelect, type SelectProps } from "@mantine/core";
import type { ForwardedRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Select<T extends FieldValues> extends SelectProps {
  name: Path<T>;
  control: Control<T>;
  innerRef?: ForwardedRef<HTMLInputElement>;
}

export function Select<T extends FieldValues>({
  name,
  control,
  innerRef,
  ...props
}: Select<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineSelect
          {...field}
          {...props}
          onChange={(v, option) => {
            props.onChange?.(v, option);
            field.onChange(v);
          }}
          ref={innerRef}
        />
      )}
    />
  );
}
