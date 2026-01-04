import { z } from "zod";
import { apiClient } from "#utils/apiClient";
import { objToFormData } from "#utils/utils";
import {
  SentencesResponseSchema,
  TagSchema,
  TermDetailSchema,
  TermPopupSchema,
  CreateTermResponseSchema,
  TermsListSchema,
  TermSuggestionSchema,
} from "./schemas";
import type { TermForm } from "./types";

const BASE_URL = "/terms";

export const api = {
  getAll(filters?: string) {
    return apiClient.get(
      filters ? `${BASE_URL}/?${filters}` : `${BASE_URL}/`,
      TermsListSchema
    );
  },

  getById(id: number) {
    return apiClient.get(`${BASE_URL}/${id}`, TermDetailSchema);
  },

  getByText(text: string, langId: number) {
    return apiClient.get(`${BASE_URL}/${text}/${langId}`, TermDetailSchema);
  },

  getPopup(id: number) {
    return apiClient.get(`${BASE_URL}/${id}/popup`, TermPopupSchema.nullable());
  },

  getSuggestions(text: string, langId: number) {
    return apiClient.get(
      `${BASE_URL}/${text}/${langId}/suggestions`,
      z.array(TermSuggestionSchema)
    );
  },

  getSentences(text: string, langId: number) {
    return apiClient.get(
      `${BASE_URL}/${text}/${langId}/sentences`,
      SentencesResponseSchema
    );
  },

  getTags() {
    return apiClient.get(`${BASE_URL}/tags`, z.array(TagSchema));
  },

  getTagSuggestions() {
    return apiClient.get(
      `${BASE_URL}/tags/suggestions`,
      z.array(z.string().nonempty())
    );
  },

  create(data: TermForm) {
    return apiClient.post(BASE_URL, CreateTermResponseSchema, {
      body: objToFormData(data),
    });
  },

  edit(data: TermForm | Partial<TermForm>[]) {
    if (Array.isArray(data)) {
      return _editMultiple(data);
    } else {
      return _editById(data);
    }
  },

  delete(id: number) {
    return apiClient.delete(`${BASE_URL}/${id}`, CreateTermResponseSchema);
  },
};

function _editById(data: TermForm) {
  return apiClient.patch(`${BASE_URL}/${data.id}`, CreateTermResponseSchema, {
    body: objToFormData(data),
  });
}

function _editMultiple(data: Partial<TermForm>[]) {
  return apiClient.patch(`${BASE_URL}/`, CreateTermResponseSchema, {
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
