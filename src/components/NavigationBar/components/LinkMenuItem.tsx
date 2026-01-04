import { Link } from "@tanstack/react-router";
import { Menu } from "@mantine/core";

interface LinkMenuItem {
  label: string;
  action: string;
}

export function LinkMenuItem({ item }: { item: LinkMenuItem }) {
  return (
    <Menu.Item
      key={item.label}
      renderRoot={(props) => <Link to={item.action} {...props} />}>
      {item.label}
    </Menu.Item>
  );
}
