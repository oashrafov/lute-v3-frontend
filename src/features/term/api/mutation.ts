import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import {
  termCreated,
  termDeleted,
  termUpdated,
} from "../resources/notifications";
import { api } from "./api";
import { query } from "#book/api/query";

export const mutation = {
  useCreateTerm() {
    return useMutation({
      mutationFn: api.create,
      onSuccess(_data, _variables, _onMutateResult, context) {
        notifications.show(termCreated);
        context.client.invalidateQueries({
          queryKey: query.allPages(),
        });
        context.client.invalidateQueries({
          queryKey: query.allStats(),
        });
      },
    });
  },

  useEditTerm() {
    return useMutation({
      mutationFn: api.edit,
      onSuccess: (_data, _variables, _onMutateResult, context) => {
        notifications.show(termUpdated);
        context.client.invalidateQueries({
          queryKey: query.allPages(),
        });
        context.client.invalidateQueries({
          queryKey: query.allStats(),
        });
      },
    });
  },

  useDeleteTerm() {
    return useMutation({
      mutationFn: api.delete,
      onSuccess: (_data, _variables, _onMutateResult, context) => {
        notifications.show(termDeleted);
        context.client.invalidateQueries({
          queryKey: query.allPages(),
        });
        context.client.invalidateQueries({
          queryKey: query.allStats(),
        });
      },
    });
  },
};
