import { Button, Group, Textarea, TextInput } from "@mantine/core";

export function NewTagForm() {
  return (
    <form>
      <TextInput label="Name" placeholder="Tag" withAsterisk />
      <Textarea
        label="Comment"
        placeholder="Comment"
        resize="vertical"
        autosize
        spellCheck={false}
        autoCapitalize="off"
        minRows={3}
      />
      <Group justify="flex-end" mt="sm" gap={5} wrap="nowrap">
        <Button>Save</Button>
      </Group>
    </form>
  );
}
