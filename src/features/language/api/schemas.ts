import { z } from "zod";
import {
  LanguageParserTypeSchema,
  TextDirectionSchema,
} from "#resources/schemas";

const LanguageIdSchema = z.int().positive();

export const DictionarySchema = z.object({
  id: z.int().nullable(),
  label: z.string(),
  url: z.string(),
  isActive: z.boolean(),
  usedFor: z.enum(["terms", "sentences"]),
  type: z.enum(["embedded", "popup"]),
  hostname: z.string(),
});

export const LanguageFormDefaultsSchema = z.object({
  name: z.string(),
  characterSubstitutions: z.string(),
  splitSentencesAt: z.string(),
  splitSentencesExceptions: z.string(),
  wordCharacters: z.string(),
  textDirection: TextDirectionSchema,
  showPronunciation: z.boolean(),
  parserType: LanguageParserTypeSchema,
  dictionaries: z.array(DictionarySchema),
});

export const LanguageDetailSchema = z.object({
  id: LanguageIdSchema,
  name: z.string().nonempty(),
  parserType: LanguageParserTypeSchema,
  textDirection: TextDirectionSchema,
  showPronunciation: z.boolean(),
  splitSentencesAt: z.string(),
  splitSentencesExceptions: z.string(),
  wordCharacters: z.string(),
  characterSubstitutions: z.string(),
  dictionaries: z.array(DictionarySchema),
});

export const LanguageFormSchema = LanguageDetailSchema.extend({
  id: LanguageIdSchema.nullable(),
});

export const LanguagesListItemSchema = z.object({
  id: LanguageIdSchema,
  name: z.string().nonempty(),
  textDirection: TextDirectionSchema,
  bookCount: z.int().nonnegative(),
  termCount: z.int().nonnegative(),
});

export const LanguagesListSchema = z.array(LanguagesListItemSchema);

export const LanguagePresetsSchema = z.array(z.string().nonempty());

export const LanguageParserSchema = z.object({
  label: z.string().nonempty(),
  value: LanguageParserTypeSchema,
});

export const LanguageResponseSchema = z.object({
  id: LanguageIdSchema,
  name: LanguageDetailSchema.shape.name,
});
