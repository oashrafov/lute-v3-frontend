import { Divider } from "@mantine/core";
import { useBookContext } from "#book/hooks/useBookContext";
import { DrawerFooter } from "#components/DrawerMenu/components/DrawerFooter";
import { Actions } from "#components/DrawerMenu/components/Actions/Actions";
import { SegmentedSection } from "#components/DrawerMenu/components/SegmentedSection/SegmentedSection";
import { DrawerMenu } from "#components/DrawerMenu/DrawerMenu";

export function SideMenu() {
  const { drawer } = useBookContext();
  return (
    <DrawerMenu opened={drawer.isOpen} onClose={drawer.close}>
      <Actions />
      <SegmentedSection />
      <Divider />
      <DrawerFooter />
    </DrawerMenu>
  );
}
