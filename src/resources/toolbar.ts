import {
  IconBaselineDensityMedium,
  IconBaselineDensitySmall,
  IconColumns1,
  IconColumns2,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
  IconTextDecrease,
  IconTextIncrease,
} from "@tabler/icons-react";
import {
  handleSetColumnCount,
  handleSetFontSize,
  handleSetLineHeight,
  handleSetTextWidth,
} from "#helpers/page";
import { text } from "#helpers/general";

export const toolbar = [
  [
    {
      label: "Decrease font size",
      icon: IconTextDecrease,
      action: () => handleSetFontSize(text.fontSize() - 0.1),
    },
    {
      label: "Increase font size",
      icon: IconTextIncrease,
      action: () => handleSetFontSize(text.fontSize() + 0.1),
    },
  ],
  [
    {
      label: "Decrease line height",
      icon: IconBaselineDensityMedium,
      action: () => handleSetLineHeight(text.lineHeight() - 1),
    },
    {
      label: "Increase line height",
      icon: IconBaselineDensitySmall,
      action: () => handleSetLineHeight(text.lineHeight() + 1),
    },
  ],
  [
    {
      label: "Set columns to 1",
      icon: IconColumns1,
      action: () => handleSetColumnCount(1),
    },
    {
      label: "Set columns to 2",
      icon: IconColumns2,
      action: () => handleSetColumnCount(2),
    },
  ],
  [
    {
      label: "Decrease text width",
      icon: IconLayoutSidebarRightExpand,
      action: () => handleSetTextWidth(text.textWidth() * 0.95),
    },
    {
      label: "Increase text width",
      icon: IconLayoutSidebarLeftExpand,
      action: () => handleSetTextWidth(text.textWidth() * 1.05),
    },
  ],
] as const;
