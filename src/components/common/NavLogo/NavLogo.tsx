import { Link } from "@tanstack/react-router";
import { ActionIcon, type ImageProps } from "@mantine/core";
import { Logo } from "../Logo";

interface NavLogo extends ImageProps {
  size?: number;
}

export function NavLogo({ size = 48, ...props }: NavLogo) {
  return (
    <ActionIcon
      variant="transparent"
      size={size}
      renderRoot={(props) => <Link to="/" {...props} />}>
      <Logo size={size} {...props} />
    </ActionIcon>
  );
}
