import { z } from "zod";
import { StatusSchema, TextDirectionSchema } from "#resources/schemas";

const TermSchema = z.object({
  id: z.int().positive(),
  text: z.string(),
  parents: z.array(z.string()),
  translation: z.string(),
  pronunciation: z.string(),
  status: StatusSchema,
  tags: z.array(z.string()),
  imageSource: z.string(),
});

export const TermFormSchema = TermSchema.extend({
  id: TermSchema.shape.id.nullable(),
  originalText: z.string(),
  notes: z.string(),
  shouldSyncStatus: z.boolean(),
});

export const TermDetailSchema = TermFormSchema.extend({
  languageId: z.int().positive(),
});

export const TermsListItemSchema = TermSchema.extend({
  textDirection: TextDirectionSchema,
  createdAt: z.string(),
  languageName: z.string(),
  languageId: z.int().positive(),
});

export const TermsListSchema = z.object({
  data: z.array(TermsListItemSchema),
  filteredCount: z.int().nonnegative(),
  totalCount: z.int().nonnegative(),
});

export const CreateTermResponseSchema = z.object({
  id: TermSchema.shape.id,
  text: TermSchema.shape.text,
});

export const TermSuggestionSchema = z.object({
  id: z.int().positive(),
  text: z.string(),
  translation: z.string(),
  status: StatusSchema,
});

export const TagSchema = z.object({
  id: z.int().positive(),
  text: z.string().nonempty(),
  comment: z.string(),
  termCount: z.int().nonnegative(),
});

export const TermPopupSectionSchema = z.object({
  text: z.string(),
  translation: z.string(),
  pronunciation: z.string(),
  tags: z.array(z.string()),
});

export const TermPopupSchema = TermPopupSectionSchema.extend({
  imageData: z.record(z.string(), z.string()).nullable(),
  components: z.array(TermPopupSectionSchema),
  parents: z.array(TermPopupSectionSchema),
});

export const SentenceReferenceDataSchema = z.object({
  id: z.int().nonnegative(),
  sentence: z.string().nonempty(),
  bookId: z.int().positive(),
  bookTitle: z.string().nonempty(),
  pageNumber: z.int().positive(),
  sentenceId: z.int().nonnegative(),
});

export const TermInflectionSchema = z.object({
  inflection: z.string().nonempty(),
  references: z.array(SentenceReferenceDataSchema),
});

export const SentencesResponseSchema = z.object({
  text: z.string().nonempty(),
  inflections: z.array(TermInflectionSchema),
});
