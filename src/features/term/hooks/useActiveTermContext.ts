import { useContext } from "react";
import { ActiveTermContext } from "../store/activeTermContext";

export function useActiveTermContext() {
  const context = useContext(ActiveTermContext);

  if (!context) {
    throw new Error("Can't use outside of context");
  }

  return context;
}
