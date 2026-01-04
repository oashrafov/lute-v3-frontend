import { ActionIcon } from "@mantine/core";
import { ToolbarButton } from "./ToolbarButton";
import { toolbar } from "#resources/toolbar";
import classes from "./FocusToolbar.module.css";

export function FocusToolbar() {
  return (
    <div className={classes.toolbar}>
      {toolbar.map((buttonGrp, index) => (
        <ActionIcon.Group key={index} orientation="horizontal">
          {buttonGrp.map((button) => (
            <ToolbarButton key={button.label} data={button} />
          ))}
        </ActionIcon.Group>
      ))}
    </div>
  );
}
