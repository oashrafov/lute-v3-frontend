import {
  ActionIcon,
  Divider,
  Popover,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { IFrame } from "#language/components/DictsPane/components/common/Iframe";

export function TestDictionaryButton({ src }: { src: string }) {
  return (
    <Popover>
      <Popover.Target>
        <Tooltip label="Test dictionary" openDelay={300}>
          <ActionIcon variant="subtle" size="sm">
            <IconExternalLink />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack w={500} h={350}>
          <Text mb={5} size="sm">
            If you see the expected content, this dictionary can be embedded; if
            not, change the type to &quot;Pop-up&quot;.
          </Text>

          <Divider mb={5} />

          <IFrame src={src} />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
