import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { nprogress } from "@mantine/nprogress";

export function useNavigationProgress() {
  const state = useRouterState();
  useEffect(() => {
    if (state.status === "pending") {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [state.status]);
}
