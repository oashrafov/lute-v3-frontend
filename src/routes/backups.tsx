import { createFileRoute } from "@tanstack/react-router";
import { query } from "#settings/api/query";
import { BackupsPage } from "#pages/BackupsPage";

export const Route = createFileRoute("/backups")({
  component: BackupsPage,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(query.backups()),
});
