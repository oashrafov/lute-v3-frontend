import { z } from "zod";

export const HighlightTypeSchema = z.enum([
  "bg",
  "text",
  "solid",
  "dashed",
  "none",
]);
export const StatusSchema = z.literal([0, 1, 2, 3, 4, 5, 98, 99]);
export const TextDirectionSchema = z.enum(["ltr", "rtl"]);
export const LanguageParserTypeSchema = z.enum([
  "spacedel",
  "turkish",
  "japanese",
  "classicalchinese",
]);
export const ResponseSchema = z.object({
  message: z.string(),
});
