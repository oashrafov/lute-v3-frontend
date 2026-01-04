import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { sampleBooksAdded } from "#book/resources/notifications";
import { mutation } from "#language/api/mutation";

interface LoadSampleBooksButton {
  langName: string;
  onSuccess?: (langName: string) => void;
  onConfirm?: () => void;
}

export function LoadSampleBooksButton({
  langName,
  onSuccess,
  onConfirm,
}: LoadSampleBooksButton) {
  const { mutate } = mutation.useCreateLanguage();

  function handleClick() {
    mutate(
      {
        name: langName,
        loadStories: true,
      },
      {
        onSuccess: () => {
          notifications.show(
            sampleBooksAdded(`Sample book(s) for "${langName}" added`)
          );
          onSuccess?.(langName);
        },
      }
    );
    onConfirm?.();
  }

  return (
    <ActionIcon size="md" variant="light" onClick={handleClick}>
      <IconCheck />
    </ActionIcon>
  );
}
