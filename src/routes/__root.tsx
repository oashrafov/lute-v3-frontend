import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  stripSearchParams,
  useParams,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "../components/Layout/Layout";
import { query as settingsQuery } from "#settings/api/query";
import { query as langQuery } from "#language/api/query";
import type { TextDirection } from "#resources/types";

interface RouteContext {
  queryClient: QueryClient;
}

interface Search {
  langId?: number;
  langName?: string;
  textDir?: TextDirection;
}

const defaultSearch: Search = {
  langId: undefined,
  langName: undefined,
  textDir: undefined,
};

export const Route = createRootRouteWithContext<RouteContext>()({
  beforeLoad: async ({ context }) => {
    const languages = await context.queryClient.ensureQueryData(
      langQuery.list()
    );
    return {
      textDirectionMap: Object.fromEntries(
        languages.map((language) => [language.id, language.textDirection])
      ),
    };
  },
  loader: async ({ context }) => {
    const responses = await Promise.all([
      context.queryClient.ensureQueryData(settingsQuery.globalData()),
      context.queryClient.ensureQueryData(settingsQuery.appInfo()),
      context.queryClient.ensureQueryData(langQuery.presetsList()),
      context.queryClient.ensureQueryData(langQuery.list()),
    ]);

    const globalData = responses[0];
    if (!globalData.hasBooks && globalData.hasLanguages) {
      throw redirect({ to: "/create-book" });
    }

    return responses;
  },
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): Search => ({
    langId:
      search.langId !== undefined
        ? Number(search.langId)
        : defaultSearch.langId,
    textDir:
      search.textDir !== undefined
        ? (search.textDir as TextDirection)
        : defaultSearch.textDir,
    langName:
      search.langName !== undefined
        ? String(search.langName)
        : defaultSearch.langName,
  }),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
});

function RouteComponent() {
  const { bookId } = useParams({ strict: false });
  return (
    <>
      {bookId !== undefined ? <Outlet /> : <Layout />}
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
