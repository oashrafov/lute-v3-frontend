import { Text, type TextProps } from "@mantine/core";
import { convertSecsToDisplayString } from "#utils/utils";

interface PlayerTimecode extends TextProps {
  time: number;
  disabled?: boolean;
}

export function PlayerTimecode({ time, disabled, ...props }: PlayerTimecode) {
  return (
    <Text
      fz="xs"
      component="span"
      miw={50}
      {...props}
      c={disabled ? "gray.5" : undefined}>
      {convertSecsToDisplayString(time)}
    </Text>
  );
}
