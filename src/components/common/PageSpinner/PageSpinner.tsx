import { Group, Loader } from "@mantine/core";

export function PageSpinner() {
  return (
    <Group justify="center" align="center" pos="relative" h="100%">
      <Loader />
    </Group>
  );
}
