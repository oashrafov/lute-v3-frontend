import { createFileRoute } from "@tanstack/react-router";
import { TagsPage } from "#pages/TagsPage";
import { query } from "#term/api/query";

export const Route = createFileRoute("/terms/tags")({
  component: TagsPage,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(query.tags()),
});
