import type { Control } from "react-hook-form";
import type { TextareaProps } from "@mantine/core";
import { IconNote } from "@tabler/icons-react";
import { Textarea } from "#common/Textarea/Textarea";
import type { TermForm } from "#term/api/types";
import classes from "../../TermForm.module.css";

interface NotesField extends Omit<TextareaProps, "name"> {
  control: Control<TermForm>;
}

export function NotesField({ control, ...props }: NotesField) {
  return (
    <Textarea
      name="notes"
      control={control}
      placeholder="Notes"
      resize="vertical"
      autosize
      spellCheck={false}
      autoCapitalize="off"
      minRows={3}
      leftSection={<IconNote size={20} />}
      leftSectionProps={{ className: classes.leftSection }}
      mb={5}
      {...props}
    />
  );
}
