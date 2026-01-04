import { getRouteApi } from "@tanstack/react-router";
import type { View } from "#resources/types";
import { getFromLocalStorage, setLocalStorageItem } from "#helpers/general";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function useView() {
  const navigate = route.useNavigate();
  const { view } = route.useSearch();

  function setView(view: View) {
    setLocalStorageItem("Lute.view", view);
    navigate({ search: (s) => ({ ...s, view }) });
  }

  function toggleFocus() {
    setView(view === "focus" ? "default" : "focus");
  }

  return {
    get view() {
      return (view ?? getFromLocalStorage("Lute.view")) as View;
    },
    toggleFocus,
    setView,
  };
}
