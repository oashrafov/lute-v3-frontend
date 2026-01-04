import { ThemeIcon, Tooltip } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export function DockerPathInfo() {
  return (
    <Tooltip
      multiline
      w={260}
      fz="xs"
      label="These are paths in your container, not on the host. You mounted
            host paths when you started the container.">
      <ThemeIcon size="xs" radius="xl" variant="light">
        <IconQuestionMark />
      </ThemeIcon>
    </Tooltip>
  );
}
