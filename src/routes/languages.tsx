import { createFileRoute } from "@tanstack/react-router";
import { query as langQuery } from "#language/api/query";
import { LanguagesPage } from "#pages/LanguagesPage/LanguagesPage";

export const Route = createFileRoute("/languages")({
  component: LanguagesPage,
  loader: async ({ context }) => {
    return await Promise.all([
      context.queryClient.ensureQueryData(langQuery.form()),
      context.queryClient.ensureQueryData(langQuery.parsers()),
    ]);
  },
});
