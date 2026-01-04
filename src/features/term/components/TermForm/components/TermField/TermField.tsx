import { IconBubbleText } from "@tabler/icons-react";
import type { TextInputProps } from "@mantine/core";
import type { Control } from "react-hook-form";
import { TextInput } from "#common/TextInput/TextInput";
import type { TermForm } from "#term/api/types";
import classes from "../../TermForm.module.css";

interface TermField extends Omit<TextInputProps, "name"> {
  control: Control<TermForm>;
}

export function TermField({ control, ...props }: TermField) {
  return (
    <TextInput
      name="originalText"
      control={control}
      placeholder="Term"
      flex={1}
      leftSection={<IconBubbleText size={20} />}
      leftSectionProps={{ className: classes.leftSection }}
      {...props}
    />
  );
}
