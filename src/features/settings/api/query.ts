import { queryOptions } from "@tanstack/react-query";
import { api } from "./api";

export const query = {
  globalData: () =>
    queryOptions({
      queryKey: ["globalData"],
      queryFn: api.getGlobalData,
      staleTime: Infinity,
    }),
  settingsForm: () =>
    queryOptions({
      queryKey: ["settingsForm"],
      queryFn: api.getSettingsFormValues,
    }),
  themeForm: () =>
    queryOptions({
      queryKey: ["themeForm"],
      queryFn: api.getThemeFormValues,
    }),
  shortcuts: () =>
    queryOptions({
      queryKey: ["shortcuts"],
      queryFn: api.getShortcuts,
    }),
  appInfo: () =>
    queryOptions({
      queryKey: ["appInfo"],
      queryFn: api.getAppInfo,
      staleTime: Infinity,
    }),
  backups: () =>
    queryOptions({ queryKey: ["backups"], queryFn: api.getBackupsInfo }),
} as const;
