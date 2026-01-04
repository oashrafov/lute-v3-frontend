import type { NotificationData } from "@mantine/notifications";
import { IconPencilCancel, IconPencilCheck } from "@tabler/icons-react";

const notificationsDefault: Partial<NotificationData> = {
  position: "bottom-right",
  autoClose: 3000,
  withCloseButton: false,
  withBorder: true,
};

export const termDeleted: NotificationData = {
  ...notificationsDefault,
  title: "Term deleted",
  icon: <IconPencilCancel />,
  color: "red",
  message: "",
};

export const termUpdated: NotificationData = {
  ...notificationsDefault,
  title: "Term updated",
  icon: <IconPencilCheck />,
  color: "green.6",
  message: "",
};

export const termCreated: NotificationData = {
  ...notificationsDefault,
  title: "Term created",
  icon: <IconPencilCheck />,
  color: "green.6",
  message: "",
};
