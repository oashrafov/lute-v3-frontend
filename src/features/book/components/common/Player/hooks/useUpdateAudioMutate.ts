import { useCallback } from "react";
import { mutation } from "#book/api/mutation";
import { query } from "#book/api/query";

export function useUpdateAudioMutate() {
  const { mutate } = mutation.useEditBook();
  return useCallback(
    (id: number, bookmarks?: string, position?: number) => {
      mutate(
        {
          id,
          data: {
            action: "updateAudioData",
            bookmarks,
            position,
          },
          userData: {
            showNotification: false,
          },
        },
        {
          onSuccess: (...[, , , context]) => {
            if (position == undefined) {
              context.client.invalidateQueries({
                queryKey: query.detail(id).queryKey,
              });
            }
          },
        }
      );
    },
    [mutate]
  );
}
