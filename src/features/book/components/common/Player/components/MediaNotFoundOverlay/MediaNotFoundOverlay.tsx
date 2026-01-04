import { Overlay } from "@mantine/core";
import classes from "./MediaNotFoundOverlay.module.css";

export function MediaNotFoundOverlay() {
  return (
    <Overlay className={classes.overlay}>Error: Media file not found</Overlay>
  );
}
