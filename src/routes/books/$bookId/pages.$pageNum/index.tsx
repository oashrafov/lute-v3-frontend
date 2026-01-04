import {
  createFileRoute,
  redirect,
  stripSearchParams,
  type SearchSchemaInput,
} from "@tanstack/react-router";
import type { View } from "#resources/types";
import { BookPage } from "#pages/BookPage";
import { query as bookQuery } from "#book/api/query";
import { query as settingsQuery } from "#settings/api/query";
import { query as langQuery } from "#language/api/query";
import { query as termQuery } from "#term/api/query";

type TermIds = number[];

interface Search {
  view: View;
  termIds: number[];
  sentenceId: number;
}

const defaultSearch = {
  view: "default" as View,
  termIds: [],
  sentenceId: -1,
};

export const Route = createFileRoute("/books/$bookId/pages/$pageNum/")({
  component: BookPage,
  params: {
    parse: (params) => ({ pageNum: Number(params.pageNum) }),
  },
  beforeLoad: async ({ context, params }) => {
    try {
      const bookData = await context.queryClient.ensureQueryData(
        bookQuery.detail(params.bookId)
      );
      return {
        langId: bookData.languageId,
        textDirection: bookData.textDirection,
      };
    } catch {
      throw redirect({ to: "/" });
    }
  },
  loaderDeps: ({ search: { textDir } }) => ({ textDir }),
  loader: async ({ context, params, deps: { textDir } }) => {
    const bookData = await context.queryClient.ensureQueryData(
      bookQuery.detail(params.bookId)
    );

    if (params.pageNum > bookData.pageCount) {
      throw redirect({
        params: { bookId: params.bookId, pageNum: bookData.pageCount },
        search: true,
      });
    }

    if (textDir === undefined) {
      throw redirect({
        search: (prev) => ({
          ...prev,
          textDir: bookData.textDirection,
        }),
      });
    }

    const responses = await Promise.all([
      context.queryClient.ensureQueryData(
        bookQuery.page(params.bookId, params.pageNum)
      ),
      context.queryClient.ensureQueryData(settingsQuery.settingsForm()),
      context.queryClient.ensureQueryData(settingsQuery.shortcuts()),
      context.queryClient.ensureQueryData(termQuery.tagSuggestions()),
      context.queryClient.ensureQueryData(
        langQuery.detail(bookData.languageId)
      ),
    ]);

    return [bookData, ...responses];
  },
  validateSearch: (
    search: Record<string, unknown> & SearchSchemaInput
  ): Search => ({
    view: (search.view as View) ?? defaultSearch.view,
    termIds: (search.termIds as TermIds) ?? defaultSearch.termIds,
    sentenceId: Number(search.sentenceId ?? defaultSearch.sentenceId),
  }),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
});
