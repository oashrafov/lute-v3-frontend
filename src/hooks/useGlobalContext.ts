import { useContext } from "react";
import { GlobalContext } from "../store/globalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Can't use outside of context");
  }

  return context;
}
