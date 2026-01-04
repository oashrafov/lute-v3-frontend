import { useContext } from "react";
import { BookContext } from "../store/bookContext";

export function useBookContext() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("Can't use outside of context");
  }

  return context;
}
