import { notifications } from "@mantine/notifications";
import {
  IconClick,
  IconAlignLeft,
  IconPilcrow,
  IconClipboardCheck,
  IconClipboardText,
  IconClipboardTypography,
  IconBookmarkPlus,
} from "@tabler/icons-react";
import { translateTextContent } from "#helpers/translation";
import { handleBookmarkSentence } from "#helpers/bookmark";
import { markTextitemsRange } from "#helpers/text";
import { copyUnitText } from "#helpers/copy";
import { textCopied } from "#book/resources/notifications";
import type { TextitemElement, TextUnit } from "#resources/types";

export const menu = [
  {
    label: "Translate",
    items: [
      {
        label: "Selection",
        icon: IconClick,
        action: (textitem: TextitemElement) => translateTextContent(textitem),
      },
      {
        label: "Sentence",
        icon: IconAlignLeft,
        action: (textitem: TextitemElement) =>
          translateTextContent(textitem, "sentence"),
      },
      {
        label: "Paragraph",
        icon: IconPilcrow,
        action: (textitem: TextitemElement) =>
          translateTextContent(textitem, "paragraph"),
      },
    ],
  },
  {
    label: "Copy",
    items: [
      {
        label: "Selection",
        icon: IconClipboardCheck,
        action: async (textitem: TextitemElement) => handleTextCopy(textitem),
      },
      {
        label: "Sentence",
        icon: IconClipboardText,
        action: async (textitem: TextitemElement) =>
          handleTextCopy(textitem, "sentence"),
      },
      {
        label: "Paragraph",
        icon: IconClipboardTypography,
        action: async (textitem: TextitemElement) =>
          handleTextCopy(textitem, "paragraph"),
      },
      {
        label: "Page",
        icon: IconClipboardTypography,
        action: async (textitem: TextitemElement) =>
          handleTextCopy(textitem, "page"),
      },
    ],
  },
  {
    label: "",
    items: [
      {
        label: "Bookmark sentence",
        icon: IconBookmarkPlus,
        action: (textitem: TextitemElement) => handleBookmarkSentence(textitem),
      },
    ],
  },
] as const;

async function handleTextCopy(textitem: TextitemElement, unit?: TextUnit) {
  const { text, textitems } = await copyUnitText(textitem, unit);
  markTextitemsRange(textitems);
  notifications.show(textCopied(text));

  return { text, textitems };
}
