import {
  Tooltip,
  Switch,
  type SwitchProps,
  type TooltipProps,
} from "@mantine/core";
import { type TablerIcon } from "@tabler/icons-react";

interface ModeSwitch extends SwitchProps {
  label: TooltipProps["label"];
  icon: TablerIcon;
}

export function ModeSwitch({ icon: Icon, label, ...switchProps }: ModeSwitch) {
  return (
    <Tooltip label={label} position="left" openDelay={800} refProp="rootRef">
      <Switch
        {...switchProps}
        size="sm"
        onLabel="ON"
        offLabel="OFF"
        thumbIcon={<Icon size={12} color="teal" stroke={2} />}
      />
    </Tooltip>
  );
}
