import { createFileRoute } from "@tanstack/react-router";
import { query } from "#settings/api/query";
import { SettingsPage } from "#pages/SettingsPage";

export const Route = createFileRoute("/settings/")({
  component: SettingsPage,
  loader: async ({ context }) =>
    await context.queryClient.ensureQueryData(query.settingsForm()),
});
