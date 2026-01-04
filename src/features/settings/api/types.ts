import { z } from "zod";
import {
  AppInfoSchema,
  BackupSchema,
  BackupsResponseSchema,
  GlobalDataSchema,
  LanguageChoiceSchema,
  SettingsFormSchema,
  ShortcutsFormSchema,
} from "./schemas";

export type ShortcutsForm = z.infer<typeof ShortcutsFormSchema>;
export type SettingsForm = z.infer<typeof SettingsFormSchema>;
export type AppInfoResponse = z.infer<typeof AppInfoSchema>;
export type LanguageChoice = z.infer<typeof LanguageChoiceSchema>;
export type GlobalDataResponse = z.infer<typeof GlobalDataSchema>;
export type Backup = z.infer<typeof BackupSchema>;
export type BackupsResponse = z.infer<typeof BackupsResponseSchema>;
