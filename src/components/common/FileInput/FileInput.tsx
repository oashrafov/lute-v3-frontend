import {
  FileInput as MantineFileInput,
  type FileInputProps,
} from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FileInput<T extends FieldValues> extends FileInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function FileInput<T extends FieldValues>({
  name,
  control,
  ...props
}: FileInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineFileInput
          {...field}
          {...props}
          onChange={(v) => {
            props.onChange?.(v as File | null);
            field.onChange(v);
          }}
        />
      )}
    />
  );
}
