import { createFileRoute, redirect } from "@tanstack/react-router";
import { EditTermPage } from "#pages/EditTermPage";
import { query as langQuery } from "#language/api/query";
import { query as termQuery } from "#term/api/query";

export const Route = createFileRoute("/terms/$termId")({
  component: EditTermPage,
  params: {
    parse: (params) => ({ termId: Number(params.termId) }),
  },
  beforeLoad: async ({ context, params }) => {
    try {
      const termData = await context.queryClient.ensureQueryData(
        termQuery.detail({ id: params.termId })
      );
      return {
        textDirection: context.textDirectionMap[termData.languageId],
        termData,
      };
    } catch {
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ context }) => {
    return await Promise.all([
      context.queryClient.ensureQueryData(
        langQuery.detail(context.termData.languageId)
      ),
      context.queryClient.ensureQueryData(termQuery.tagSuggestions()),
    ]);
  },
});
