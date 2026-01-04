import { Radio, rem, type RadioProps } from "@mantine/core";
import {
  IconCheck,
  IconMinus,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
} from "@tabler/icons-react";
import { RadioIcon } from "./RadioIcon";
import classes from "./StatusRadio.module.css";

const statusIcon = {
  1: <IconNumber1 />,
  2: <IconNumber2 />,
  3: <IconNumber3 />,
  4: <IconNumber4 />,
  5: <IconNumber5 />,
  98: <IconMinus />,
  99: <IconCheck />,
};

const statusColor = (id: string) => `var(--lute-color-highlight-status${id})`;
const iconColor = (id: string) => `var(--lute-text-color-status${id})`;

interface RadioButtons {
  size: RadioProps["size"];
  disabled: boolean;
}

export function RadioButtons({ size, disabled }: RadioButtons) {
  const radios = Object.entries(statusIcon);
  return radios.map(([status, icon]) => (
    <Radio
      key={status}
      className={disabled ? classes.disabled : ""}
      style={{ "--radio-icon-size": rem(16) }}
      styles={{
        radio: {
          backgroundColor: statusColor(status),
          border: "none",
        },
      }}
      size={size}
      disabled={disabled}
      value={disabled ? "" : status}
      name={status}
      iconColor={iconColor(status)}
      color={statusColor(status)}
      icon={(props) => <RadioIcon label={icon} {...{ fz: size, ...props }} />}
      ml={status == radios[radios.length - 1][0] ? 10 : 0}
    />
  ));
}
