import { z } from "zod";
import { StatusSchema, HighlightTypeSchema } from "#resources/schemas";

export const SettingsFormSchema = z.object({
  isBackupEnabled: z.boolean(),
  backupDirectory: z.string().nullable(),
  shouldBackupWarn: z.boolean(),
  shouldAutoBackup: z.boolean(),
  backupCount: z.number(),
  backupLastDate: z.string().nullable(),
  backupTimeSinceLast: z.string().nullable(),
  openDictionaryPopupInNewTab: z.boolean(),
  statsCalculationSampleSize: z.string(), // todo - convert to number
  stopAudioOnTermSelection: z.boolean(),
  termPopupPromoteParentTranslation: z.boolean(),
  termPopupShowComponents: z.boolean(),
  japaneseScript: z.enum(["hiragana", "katakana", "romaji"]),
  mecabPath: z.string().nullable(),
});

export const AppInfoSchema = z.object({
  version: z.string(),
  luteDb: z.string(),
  luteDbDirectory: z.string(),
  isDocker: z.boolean(),
});

export const LanguageChoiceSchema = z.object({
  name: z.string(),
  id: z.int(),
});

export const GlobalDataSchema = z.object({
  hasLanguages: z.boolean(),
  hasBooks: z.boolean(),
  tutorialBookId: z.number().nullable(),
  languageChoices: z.array(LanguageChoiceSchema),
  bookTags: z.array(z.string()),
});

export const BackupSchema = z.object({
  name: z.string(),
  size: z.string(),
  lastModified: z.string(),
});

export const BackupsResponseSchema = z.object({
  backups: z.array(BackupSchema),
  directory: SettingsFormSchema.shape.backupDirectory,
});

export const ShortcutsFormSchema = z.record(
  z.string(),
  z.object({
    key: z.string(),
    description: z.string(),
    category: z.string(),
  })
);

const HighlightOptionsSchema = z.object({
  light: z.string().nonempty(), //hex color
  dark: z.string().nonempty(),
  type: HighlightTypeSchema.optional(),
});

const StatusHighlightsSchema = z.record(
  StatusSchema,
  HighlightOptionsSchema.required()
);

const GeneralHighlightsSchema = z.record(
  z.enum(["flash", "marked", "selected", "hovered"]),
  HighlightOptionsSchema
);

export const HighlightsResponseSchema = z.object({
  status: StatusHighlightsSchema,
  general: GeneralHighlightsSchema,
});
