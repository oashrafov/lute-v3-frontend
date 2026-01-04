import { useMutation } from "@tanstack/react-query";
import { api } from "./api";
import { query as bookQuery } from "#book/api/query";
import { query as settingsQuery } from "#settings/api/query";
import { query as langQuery } from "./query";

interface CreateLanguageData {
  name: string;
  loadStories?: boolean;
}

export const mutation = {
  useCreateLanguage() {
    return useMutation({
      mutationFn: ({ name, loadStories }: CreateLanguageData) =>
        api.create(name, loadStories),
      onSuccess: async (_data, _variables, _onMutateResult, context) => {
        context.client.removeQueries({
          queryKey: bookQuery.all(),
        });
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: settingsQuery.globalData().queryKey,
          }),
          context.client.invalidateQueries({
            queryKey: langQuery.list().queryKey,
          }),
          context.client.invalidateQueries({
            queryKey: langQuery.presetsList().queryKey,
          }),
        ]);
      },
    });
  },
};
