import { z } from "zod";
import {
  SentenceReferenceDataSchema,
  SentencesResponseSchema,
  TagSchema,
  TermDetailSchema,
  TermFormSchema,
  TermInflectionSchema,
  TermPopupSchema,
  TermPopupSectionSchema,
  TermsListItemSchema,
  TermsListSchema,
  TermSuggestionSchema,
} from "./schemas";

export type TermQueryParams = TermByIdQueryParams | TermByTextParams;

interface TermByIdQueryParams {
  id: number;
}

interface TermByTextParams {
  text: string;
  langId: number;
}

export type SentenceReferenceData = z.infer<typeof SentenceReferenceDataSchema>;
export type TermInflection = z.infer<typeof TermInflectionSchema>;
export type SentencesResponse = z.infer<typeof SentencesResponseSchema>;
export type TermPopupSection = z.infer<typeof TermPopupSectionSchema>;
export type TermPopup = z.infer<typeof TermPopupSchema>;
export type TermDetail = z.infer<typeof TermDetailSchema>;
export type TermsList = z.infer<typeof TermsListSchema>;
export type TermsListItem = z.infer<typeof TermsListItemSchema>;
export type TermForm = z.infer<typeof TermFormSchema>;
export type TermSuggestion = z.infer<typeof TermSuggestionSchema>;
export type Tag = z.infer<typeof TagSchema>;
