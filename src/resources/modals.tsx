import { Paper, rem, Text } from "@mantine/core";

export const appInfo = {
  modal: "about",
  title: "About Lute",
  innerProps: "",
  styles: {
    title: { fontWeight: 500 },
    content: { overflow: "unset", padding: rem(8) },
    body: { width: "max-content" },
  },
};

export const deleteBookConfirm = (name: string, onConfirm: () => void) => ({
  title: "Delete term",
  children: (
    <Text size="sm">
      Are you sure you want to delete{" "}
      <Text component="span" fw="bold">
        {`"${name}"`}
      </Text>
    </Text>
  ),
  labels: { confirm: "Delete", cancel: "Cancel" },
  confirmProps: { color: "red" },
  onConfirm: onConfirm,
});

export const deleteTermConfirm = (name: string, onConfirm: () => void) => ({
  title: "Delete term",
  children: (
    <Text size="sm">
      Are you sure you want to delete{" "}
      <Text component="span" fw="bold">
        {`"${name}"`}
      </Text>
    </Text>
  ),
  labels: { confirm: "Delete", cancel: "Cancel" },
  confirmProps: { color: "red" },
  onConfirm: onConfirm,
});

export const deleteLanguageConfirm = (
  langName: string,
  onConfirm: () => void
) => ({
  title: "Delete language",
  children: (
    <>
      <Paper p="lg">
        <Text>
          <strong>WARNING:</strong> deleting a language deletes all its books
          and defined terms!
        </Text>
      </Paper>
      <Text size="sm" mt={10}>
        Are you sure you want to delete{" "}
        <Text component="span" fw="bold">
          {`"${langName}"`}
        </Text>{" "}
        ?
      </Text>
    </>
  ),
  labels: { confirm: "Delete", cancel: "Cancel" },
  confirmProps: { color: "red" },
  onConfirm: onConfirm,
});
