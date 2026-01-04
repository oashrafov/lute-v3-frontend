import { IconFocus2 } from "@tabler/icons-react";
import { ModeSwitch } from "../ModeSwitch/ModeSwitch";
import { useView } from "#book/hooks/useView";

export function FocusSwitch() {
  const { view, toggleFocus } = useView();

  return (
    <ModeSwitch
      label="Focus mode"
      icon={IconFocus2}
      checked={view === "focus"}
      onChange={toggleFocus}
    />
  );
}
