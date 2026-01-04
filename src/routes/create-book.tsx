import {
  createFileRoute,
  stripSearchParams,
  type SearchSchemaInput,
} from "@tanstack/react-router";
import { query as langQuery } from "#language/api/query";
import { query as bookQuery } from "#book/api/query";
import { CreateBookPage } from "#pages/CreateBookPage/CreateBookPage";

interface Search {
  step: number;
  langForm?: boolean;
}

const defaultSearch = {
  step: 0,
  langForm: false,
};

export const Route = createFileRoute("/create-book")({
  component: CreateBookPage,
  loader: async ({ context }) => {
    return await Promise.all([
      context.queryClient.ensureQueryData(bookQuery.form()),
      context.queryClient.ensureQueryData(langQuery.form()),
      context.queryClient.ensureQueryData(langQuery.parsers()),
    ]);
  },
  validateSearch: (
    search: Record<string, unknown> & SearchSchemaInput
  ): Search => ({
    langForm: Boolean(search.langForm ?? defaultSearch.langForm),
    step: Number(search.step ?? defaultSearch.step),
  }),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
});
