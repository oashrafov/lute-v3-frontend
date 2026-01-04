import { z } from "zod";
import type {
  DictionarySchema,
  LanguageFormSchema,
  LanguagesListItemSchema,
} from "./schemas";

export type UserLanguagesListItem = z.infer<typeof LanguagesListItemSchema>;
export type Dictionary = z.infer<typeof DictionarySchema>;
export type LanguageForm = z.infer<typeof LanguageFormSchema>;
