import { createFileRoute } from "@tanstack/react-router";
import { query } from "#settings/api/query";
import { ShortcutsPage } from "#pages/ShortcutsPage";

export const Route = createFileRoute("/settings/shortcuts")({
  component: ShortcutsPage,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(query.shortcuts()),
});
