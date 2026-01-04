import { Burger, type BurgerProps } from "@mantine/core";
import { useGlobalContext } from "#hooks/useGlobalContext";

export function BurgerButton(props: BurgerProps) {
  const { mainSideMenu } = useGlobalContext();
  return (
    <Burger
      opened={mainSideMenu.isOpen}
      onClick={mainSideMenu.toggle}
      size="sm"
      {...props}
    />
  );
}
