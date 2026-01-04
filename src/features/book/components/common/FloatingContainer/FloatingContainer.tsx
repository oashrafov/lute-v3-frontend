import type { ReactNode } from "react";
import {
  Affix,
  Transition,
  type AffixProps,
  type TransitionProps,
} from "@mantine/core";

interface FloatingContainer extends AffixProps {
  show: boolean;
  children: ReactNode;
  duration?: TransitionProps["duration"];
  transition?: TransitionProps["transition"];
}

export function FloatingContainer({
  show,
  duration = 250,
  transition = "fade",
  children,
  ...props
}: FloatingContainer) {
  return (
    <Affix position={{ top: 0, left: 0 }} zIndex={199} {...props}>
      <Transition transition={transition} mounted={show} duration={duration}>
        {(styles) => <div style={styles}>{children}</div>}
      </Transition>
    </Affix>
  );
}
