import type { ValidateToPath } from "@tanstack/react-router";
import {
  IconHome,
  IconBooks,
  IconBracketsContain,
  IconSettings,
  IconDeviceFloppy,
  IconInfoCircle,
  IconLanguage,
  type Icon,
} from "@tabler/icons-react";
import { DOCS_URL, DISCORD_URL, MANUAL_BACKUP_URL } from "./constants";

interface MenuItem {
  label: string;
  action:
    | ValidateToPath
    | typeof DISCORD_URL
    | typeof DOCS_URL
    | typeof MANUAL_BACKUP_URL;
  icon?: Icon;
  children?: MenuItem[];
}

export const menu = {
  home: {
    label: "Home",
    action: "/",
    icon: IconHome,
  },

  book: {
    label: "New Book",
    icon: IconBooks,
    action: "/create-book",
  },

  languages: {
    label: "Languages",
    action: "/languages",
    icon: IconLanguage,
  },

  terms: {
    label: "Terms",
    action: "/terms",
    icon: IconBracketsContain,

    children: [
      {
        label: "Terms",
        action: "/terms",
      },
      {
        label: "New Term",
        action: "/terms/create-new",
      },
      {
        label: "Tags",
        action: "/terms/tags",
      },
    ],
  },

  settings: {
    label: "Settings",
    action: "/",
    icon: IconSettings,

    children: [
      { label: "General", action: "/settings" },
      {
        label: "Keyboard shortcuts",
        action: "/settings/shortcuts",
      },
    ],
  },

  backup: {
    label: "Backup",
    action: "/",
    icon: IconDeviceFloppy,

    children: [
      {
        label: "Backups",
        action: "/backups",
      },
      {
        label: "Create backup",
        action: MANUAL_BACKUP_URL,
      },
    ],
  },

  about: {
    label: "About",
    action: "/",
    icon: IconInfoCircle,
  },

  info: {
    label: "Software info",
    action: "/",
  },

  stats: {
    label: "Usage statistics",
    action: "/stats",
  },

  docs: {
    label: "Documentation",
    action: DOCS_URL,
  },

  discord: {
    label: "Discord",
    action: DISCORD_URL,
  },
} as const satisfies Record<string, MenuItem>;
