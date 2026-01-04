import { useMemo } from "react";
import {
  Group,
  Radio,
  type RadioGroupProps,
  type RadioProps,
} from "@mantine/core";
import { RadioButtons } from "./RadioButtons";

interface StatusRadio extends Omit<RadioGroupProps, "size" | "children"> {
  disabled?: boolean;
  size?: RadioProps["size"];
}

export function StatusRadio({
  disabled = false,
  size = "md",
  ...props
}: StatusRadio) {
  const radios = useMemo(
    () => <RadioButtons size={size} disabled={disabled} />,
    [disabled, size]
  );
  return (
    <Radio.Group
      name="status"
      {...props}
      style={{ display: "flex", justifyContent: "center" }}>
      <Group justify="flex-start" gap={2} wrap="nowrap">
        {radios}
      </Group>
    </Radio.Group>
  );
}
