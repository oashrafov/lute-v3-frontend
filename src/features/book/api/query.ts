import {
  keepPreviousData,
  queryOptions,
  skipToken,
} from "@tanstack/react-query";
import { api } from "./api";

export const query = {
  all: () => ["books"],
  allList: () => [...query.all(), "list"],
  allStats: () => [...query.all(), "stats"],
  allDetails: () => [...query.all(), "detail"],
  allPages: () => [...query.all(), "page"],
  list: (filters?: string) =>
    queryOptions({
      queryKey: [...query.allList(), filters],
      queryFn: () => api.getAll(filters),
      placeholderData: keepPreviousData,
    }),
  detail: (bookId: number) =>
    queryOptions({
      queryKey: [...query.allDetails(), bookId],
      queryFn: () => api.getById(bookId),
      refetchOnWindowFocus: false,
    }),
  stats: (bookId: number) =>
    queryOptions({
      queryKey: [...query.allStats(), bookId],
      queryFn: () => api.getStats(bookId),
      enabled: bookId !== null,
    }),
  page: (bookId: number, pageNum: number) =>
    queryOptions({
      queryKey: [...query.allPages(), bookId, pageNum],
      queryFn: () => api.getPage(bookId, pageNum),
      refetchOnWindowFocus: false,
    }),
  audioSrc: (bookId?: number) =>
    queryOptions({
      queryKey: ["audio", bookId],
      queryFn: bookId ? () => api.getAudioSrc(bookId) : skipToken,
      refetchOnWindowFocus: false,
    }),
  form: () =>
    queryOptions({
      queryKey: ["form"],
      queryFn: api.getFormValues,
    }),
} as const;
