import {
  createRouteMask,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider, Portal } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import "./utils/i18n";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "mantine-react-table/styles.css";
import "./styles/index.css";
import "./styles/highlight.css";
import { GlobalContextProvider } from "./store/globalContext";
import { AppInfo } from "./components/AppInfo/AppInfo";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const bookPageRouteMask = createRouteMask({
  routeTree,
  from: "/books/$bookId/pages/$pageNum",
  to: "/books/$bookId/pages/$pageNum",
  search: { view: "default", termIds: [] },
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: () => <ErrorPage errorMessage="not found" />,
  routeMasks: [bookPageRouteMask],
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  components: {
    Portal: Portal.extend({
      defaultProps: {
        reuseTargetNode: true,
      },
    }),
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <NavigationProgress />
        <ModalsProvider modals={{ about: AppInfo }}>
          <GlobalContextProvider>
            <RouterProvider router={router} />
          </GlobalContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
