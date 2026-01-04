import { ActionIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";

interface BookSourceButton {
  source: string;
}

export function BookSourceButton({ source }: BookSourceButton) {
  return (
    <ActionIcon
      styles={{ root: { border: "none" } }}
      display="block"
      component="a"
      href={source}
      target="_blank"
      size={20}
      p={0}
      variant="transparent">
      <IconLink />
    </ActionIcon>
  );
}
