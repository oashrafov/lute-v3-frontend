import { Button, Group, type GroupProps } from "@mantine/core";
import type { MouseEventHandler } from "react";

interface FormButtons extends GroupProps {
  okLabel?: string;
  discardLabel?: string;
  okDisabled?: boolean;
  okLoading?: boolean;
  discardCallback?: MouseEventHandler<HTMLButtonElement>;
}

export function FormButtons({
  okLabel = "Save",
  discardLabel = "Cancel",
  okDisabled,
  okLoading,
  discardCallback,
  ...props
}: FormButtons) {
  return (
    <Group justify="flex-end" gap="xs" mt="xs" {...props}>
      <Button type="submit" disabled={okDisabled} loading={okLoading}>
        {okLabel}
      </Button>
      {discardLabel && (
        <Button
          onClick={discardCallback}
          variant="subtle"
          color={discardLabel === "Cancel" ? "blue.6" : "red.6"}>
          {discardLabel}
        </Button>
      )}
    </Group>
  );
}
