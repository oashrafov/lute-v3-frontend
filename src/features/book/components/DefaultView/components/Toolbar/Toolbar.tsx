import { ActionIcon, Group, Menu, rem, Stack, Tooltip } from "@mantine/core";
import { IconTypography } from "@tabler/icons-react";
import { toolbar } from "#resources/toolbar";

export function Toolbar() {
  return (
    <Menu position="bottom" offset={0} shadow="md" closeOnItemClick={false}>
      <Menu.Target>
        <ActionIcon size="sm" variant="subtle">
          <IconTypography />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown p={0}>
        <Stack gap={2} style={{ padding: rem(4) }}>
          {toolbar.slice(0, -1).map((buttonGrp, index) => (
            <Group key={index} wrap="nowrap" gap={0}>
              {buttonGrp.map(({ label, action, icon: Icon }) => (
                <Tooltip key={label} label={label} fz="xs">
                  <Menu.Item
                    p={5}
                    color="blue.6"
                    variant="subtle"
                    styles={{ itemSection: { margin: 0 } }}
                    leftSection={<Icon size={18} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      action();
                    }}
                  />
                </Tooltip>
              ))}
            </Group>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
