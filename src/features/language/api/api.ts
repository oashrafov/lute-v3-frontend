import { z } from "zod";
import { apiClient } from "#utils/apiClient";
import {
  LanguageDetailSchema,
  LanguageFormDefaultsSchema,
  LanguageParserSchema,
  LanguageResponseSchema,
  LanguagePresetsSchema,
  LanguagesListSchema,
  LanguageFormSchema,
} from "./schemas";

const BASE_URL = "/languages";

export const api = {
  getAll() {
    return apiClient.get(`${BASE_URL}/`, LanguagesListSchema);
  },

  getById(id: number) {
    return apiClient.get(`${BASE_URL}/${id}`, LanguageDetailSchema);
  },

  getLanguagePresetNames() {
    return apiClient.get(`${BASE_URL}/presets`, LanguagePresetsSchema);
  },

  getLanguagePreset(langName: string) {
    return apiClient.get(`${BASE_URL}/presets/${langName}`, LanguageFormSchema);
  },

  getParsers() {
    return apiClient.get(`${BASE_URL}/parsers`, z.array(LanguageParserSchema));
  },

  getFormValues() {
    return apiClient.get(`${BASE_URL}/form`, LanguageFormDefaultsSchema);
  },

  create(name: string, loadStories?: boolean) {
    return apiClient.post(BASE_URL, LanguageResponseSchema, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, loadStories }),
    });
  },
};
