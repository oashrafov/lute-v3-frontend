import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { bookDeleted, bookUpdated } from "../resources/notifications";
import { errorMessage } from "#resources/notifications";
import { query as bookQuery } from "./query";
import { query as settingsQuery } from "#settings/api/query";
import { api } from "./api";
import type { EditAction } from "./types";

interface EditBookData {
  id: number;
  data: EditAction;
  userData?: Record<string, unknown>;
}

interface ProcessPageData {
  bookId: number;
  pageNum: number;
}

export const mutation = {
  useCreateBook() {
    return useMutation({
      mutationFn: api.create,
      onSuccess: (_data, _variables, _onMutateResult, context) => {
        context.client.invalidateQueries({
          queryKey: bookQuery.allList(),
        });
        context.client.invalidateQueries({
          queryKey: settingsQuery.globalData().queryKey,
        });
      },
      onError: (error) => notifications.show(errorMessage(error.message)),
    });
  },

  useEditBook() {
    return useMutation({
      mutationFn: ({ id, data }: EditBookData) => api.edit(id, data),
      onSuccess: (data, { userData }, _onMutateResult, context) => {
        context.client.invalidateQueries({
          queryKey: bookQuery.allList(),
        });
        if (userData?.showNotification ?? true) {
          notifications.show(bookUpdated(data.title));
        }
      },
    });
  },

  useDeleteBook() {
    return useMutation({
      mutationFn: api.delete,
      onSuccess: (data, _variables, _onMutateResult, context) => {
        context.client.invalidateQueries({
          queryKey: bookQuery.allList(),
        });
        context.client.invalidateQueries({
          queryKey: settingsQuery.globalData().queryKey,
        });
        notifications.show(bookDeleted(data.title));
      },
    });
  },

  useGenerateContentFromURL() {
    return useMutation({
      mutationFn: api.generateContentFromURL,
      onError: (error) => notifications.show(errorMessage(error.message)),
    });
  },

  useParseContentFromFile() {
    return useMutation({
      mutationFn: api.generateContentFromFile,
      onError: (error) => notifications.show(errorMessage(error.message)),
    });
  },

  useProcessPage() {
    return useMutation({
      mutationFn: ({ bookId, pageNum }: ProcessPageData) =>
        api.processPage(bookId, pageNum),
      onSuccess: (_data, { bookId, pageNum }, _onMutateResult, context) => {
        context.client.invalidateQueries({
          queryKey: bookQuery.allList(),
        });
        context.client.invalidateQueries({
          queryKey: bookQuery.page(bookId, pageNum).queryKey,
        });
      },
    });
  },
};
