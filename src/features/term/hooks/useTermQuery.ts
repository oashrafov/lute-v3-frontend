import { useQuery } from "@tanstack/react-query";
import { query } from "../api/query";
import { useActiveTermContext } from "./useActiveTermContext";
import type { TermQueryParams } from "../api/types";

export function useTermQuery() {
  const { activeTerm } = useActiveTermContext();

  let params: TermQueryParams | undefined;

  if (activeTerm) {
    if (activeTerm.type === "single") {
      params = { id: activeTerm.data };
    } else if (activeTerm.type === "multi") {
      params = { text: activeTerm.data, langId: activeTerm.langId };
    }
  }

  return useQuery(query.detailSkippable(params));
}
