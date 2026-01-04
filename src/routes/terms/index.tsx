import { createFileRoute } from "@tanstack/react-router";
import { query as termQuery } from "#term/api/query";
import { TermsPage } from "#pages/TermsPage";

export const Route = createFileRoute("/terms/")({
  component: TermsPage,
  loader: async ({ context }) =>
    await Promise.all([
      context.queryClient.ensureQueryData(termQuery.tagSuggestions()),
      context.queryClient.ensureQueryData(termQuery.tags()),
    ]),
});
