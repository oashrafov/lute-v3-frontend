import { queryOptions, skipToken } from "@tanstack/react-query";
import { api } from "./api";

export const query = {
  all: () => ["languages"],
  allPresets: () => [...query.all(), "preset"],
  allDetails: () => [...query.all(), "detail"],
  allPresetDetails: () => [...query.allPresets(), "detail"],
  list: () =>
    queryOptions({
      queryKey: [...query.all()],
      queryFn: api.getAll,
    }),
  presetsList: () =>
    queryOptions({
      queryKey: [...query.allPresets()],
      queryFn: api.getLanguagePresetNames,
      staleTime: Infinity,
    }),
  parsers: () =>
    queryOptions({
      queryKey: [...query.all(), "parsers"],
      queryFn: api.getParsers,
      staleTime: Infinity,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...query.allDetails(), id],
      queryFn: () => api.getById(id),
      refetchOnWindowFocus: false,
    }),
  detailSkippable: (id?: number) =>
    queryOptions({
      queryKey: [...query.allDetails(), id],
      queryFn: id != null && id > 0 ? () => api.getById(id) : skipToken,
      refetchOnWindowFocus: false,
    }),
  presetDetail: (name?: string) =>
    queryOptions({
      queryKey: [...query.allPresetDetails(), name],
      queryFn: name ? () => api.getLanguagePreset(name) : skipToken,
      staleTime: Infinity,
    }),
  form: () =>
    queryOptions({
      queryKey: ["form"],
      queryFn: api.getFormValues,
    }),
} as const;
