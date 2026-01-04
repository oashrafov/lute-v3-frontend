import {
  Popover,
  UnstyledButton,
  Image,
  type PopoverProps,
} from "@mantine/core";
import { BACKEND_URL } from "#resources/constants";

interface TermImagePopover extends PopoverProps {
  imageName: string;
}

export function TermImagePopover({ imageName, ...props }: TermImagePopover) {
  const imageSrc = `${BACKEND_URL}/${imageName}`;
  return (
    <Popover position="left" {...props}>
      <Popover.Target>
        <UnstyledButton display="block">
          <Image radius={5} w={50} h={50} src={imageSrc} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Image radius={5} mah="200px" src={imageSrc} />
      </Popover.Dropdown>
    </Popover>
  );
}
