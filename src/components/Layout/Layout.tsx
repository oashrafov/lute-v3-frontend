import { Outlet } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigationProgress } from "#hooks/useNavigationProgress";
import { useMediaQuery } from "#hooks/useMediaQuery";
import { query } from "#settings/api/query";
import { MainSideMenu } from "../MainSideMenu/MainSideMenu";
import { AppHeader } from "../AppHeader/AppHeader";

export function Layout() {
  const media = useMediaQuery();
  const { data } = useSuspenseQuery(query.globalData());
  useNavigationProgress();
  return (
    <>
      {data.hasBooks && <AppHeader />}
      {data.hasBooks && media === "tablet" && <MainSideMenu />}
      <main style={{ marginTop: data.hasBooks ? "6.5rem" : "3rem" }}>
        <Outlet />
      </main>
    </>
  );
}
