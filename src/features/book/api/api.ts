import { API_BASE_URL } from "#resources/constants";
import { apiClient } from "#utils/apiClient";
import { objToFormData } from "#utils/utils";
import type { EditAction, CreateBookForm } from "./types";
import {
  BookDetailSchema,
  CreateBookFormDefaultsSchema,
  BooksListResponseSchema,
  BookStatsSchema,
  CreateBookResponseSchema,
  DeleteBookResponseSchema,
  EditBookResponseSchema,
  GenerateContentFromFileResponseSchema,
  GenerateContentFromURLResponseSchema,
  PageSchema,
  ProcessPageResponseSchema,
} from "./schemas";

const BASE_URL = "/books";

export const api = {
  getById(id: number) {
    return apiClient.get(`${BASE_URL}/${id}`, BookDetailSchema);
  },

  getAll(filters?: string) {
    return apiClient.get(
      filters ? `${BASE_URL}/?${filters}` : `${BASE_URL}/`,
      BooksListResponseSchema
    );
  },

  getStats(id: number) {
    return apiClient.get(`${BASE_URL}/${id}/stats`, BookStatsSchema);
  },

  getPage(bookId: number, pageNum: number) {
    return apiClient.get(`${BASE_URL}/${bookId}/pages/${pageNum}`, PageSchema);
  },

  async getAudioSrc(bookId: number) {
    const response = await fetch(`${API_BASE_URL}${BASE_URL}/${bookId}/audio`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },

  create(data: CreateBookForm) {
    return apiClient.post(`${BASE_URL}/`, CreateBookResponseSchema, {
      body: objToFormData(data),
    });
  },

  edit(id: number, data: EditAction) {
    return apiClient.patch(`${BASE_URL}/${id}`, EditBookResponseSchema, {
      body: objToFormData(data),
    });
  },

  delete(id: number) {
    return apiClient.delete(`${BASE_URL}/${id}`, DeleteBookResponseSchema);
  },

  generateContentFromURL(url: string) {
    return apiClient.post(
      `${BASE_URL}/parse/url`,
      GenerateContentFromURLResponseSchema,
      { headers: { "Content-Type": "text/plain" }, body: url }
    );
  },

  generateContentFromFile(file: File) {
    return apiClient.post(
      `${BASE_URL}/parse/file`,
      GenerateContentFromFileResponseSchema,
      { body: objToFormData({ file }) }
    );
  },

  processPage(bookId: number, pageNum: number) {
    return apiClient.post(
      `${BASE_URL}/${bookId}/pages/${pageNum}`,
      ProcessPageResponseSchema,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shouldTrack: true }),
      }
    );
  },

  getFormValues() {
    return apiClient.get(`${BASE_URL}/form`, CreateBookFormDefaultsSchema);
  },
};
