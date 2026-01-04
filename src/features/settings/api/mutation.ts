import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { demoDataCleared, demoDeactivated } from "#resources/notifications";
import { query as bookQuery } from "#book/api/query";
import { query as settingsQuery } from "./query";
import { api } from "./api";

export function useClearDemoData() {
  return useMutation({
    mutationFn: api.clearDemoData,
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      context.client.removeQueries({
        queryKey: bookQuery.all(),
      });
      await context.client.invalidateQueries({
        queryKey: settingsQuery.globalData().queryKey,
      });
      notifications.show(demoDataCleared);
    },
  });
}

export function useDeactivateDemoMode() {
  return useMutation({
    mutationFn: api.deactivateDemoMode,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: settingsQuery.globalData().queryKey,
      });
      notifications.show(demoDeactivated);
    },
  });
}
