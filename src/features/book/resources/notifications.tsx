import { Text } from "@mantine/core";
import type { NotificationData } from "@mantine/notifications";
import {
  IconBookOff,
  IconClipboardCheck,
  IconPencilCheck,
} from "@tabler/icons-react";

const notificationsDefault: Partial<NotificationData> = {
  position: "bottom-right",
  autoClose: 3000,
  withCloseButton: false,
  withBorder: true,
  color: "green",
};

export const bookDeleted = (message: string): NotificationData => ({
  ...notificationsDefault,
  title: "Book deleted",
  message: (
    <Text component="p" lineClamp={2} fz="xs">
      {message}
    </Text>
  ),
  icon: <IconBookOff />,
  color: "red",
});

export const bookUpdated = (message: string): NotificationData => ({
  ...notificationsDefault,
  title: "Book updated",
  message: (
    <Text component="p" lineClamp={2} fz="xs">
      {message}
    </Text>
  ),
  icon: <IconPencilCheck />,
});

export const sampleBooksAdded = (message: string): NotificationData => ({
  ...notificationsDefault,
  title: "Book(s) added",
  message: (
    <Text component="p" lineClamp={2} fz="xs">
      {message}
    </Text>
  ),
  icon: <IconPencilCheck />,
});

export const textCopied = (message: string): NotificationData => ({
  ...notificationsDefault,
  title: "Selection copied to clipboard!",
  message: (
    <Text component="p" lineClamp={2} fz="xs">
      {message}
    </Text>
  ),
  icon: <IconClipboardCheck />,
});
