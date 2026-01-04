import { useSuspenseQuery } from "@tanstack/react-query";
import { Code, Group, Stack, Text } from "@mantine/core";
import { query } from "#settings/api/query";
import { DockerPathInfo } from "./DockerPathInfo";

export function AppInfo() {
  const { data } = useSuspenseQuery(query.appInfo());

  return (
    <>
      <Text>
        <b>LUTE</b>: Learning Using Texts v3
      </Text>
      <Text>
        <b>Version</b>: {data.version}
      </Text>
      <Text>
        <b>Data path</b>:{" "}
        <Group display="inline-flex" gap={5}>
          <Code fz="sm">{data.luteDbDirectory}</Code>
          {data.isDocker && <DockerPathInfo />}
        </Group>
      </Text>
      <Text>
        <b>Database</b>: <Code fz="sm">{data.luteDb}</Code>
      </Text>

      <Stack mt="md" gap={0}>
        <Text>
          <b>Repository</b>:{" "}
          <a href="https://github.com/LuteOrg/lute-v3" target="_blank">
            lute-v3
          </a>
        </Text>
        <Text>Lute is released under the MIT License.</Text>
      </Stack>
    </>
  );
}
