import { ResponseSchema } from "#resources/schemas";
import { apiClient } from "#utils/apiClient";
import {
  AppInfoSchema,
  BackupsResponseSchema,
  GlobalDataSchema,
  HighlightsResponseSchema,
  SettingsFormSchema,
  ShortcutsFormSchema,
} from "./schemas";

const BASE_URL = "";

export const api = {
  getGlobalData() {
    return apiClient.get(`${BASE_URL}/initial`, GlobalDataSchema);
  },

  getAppInfo() {
    return apiClient.get(`${BASE_URL}/appinfo`, AppInfoSchema);
  },

  getShortcuts() {
    return apiClient.get(`${BASE_URL}/shortcuts`, ShortcutsFormSchema);
  },

  getBackupsInfo() {
    return apiClient.get(`${BASE_URL}/backups`, BackupsResponseSchema);
  },

  getSettingsFormValues() {
    return apiClient.get(`${BASE_URL}/settings/form`, SettingsFormSchema);
  },

  getThemeFormValues() {
    return apiClient.get(`${BASE_URL}/theme/form`, HighlightsResponseSchema);
  },

  clearDemoData() {
    return apiClient.delete(`${BASE_URL}/settings/db`, ResponseSchema);
  },

  deactivateDemoMode() {
    return apiClient.patch(`${BASE_URL}/settings/db`, ResponseSchema, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deactiveDemo: true }),
    });
  },
};
