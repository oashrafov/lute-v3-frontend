import { createContext, useMemo, useState, type ReactNode } from "react";
import type { TextitemElement } from "#resources/types";
import { startHoverMode } from "#helpers/interactions-desktop";
import {
  focusActiveSentence as fas,
  resetFocusActiveSentence,
} from "#helpers/text";
import { getTextContainer } from "#helpers/general";

export interface SingleTerm {
  data: number;
  type: "single";
  textitems: TextitemElement[];
}

interface MultiTerm {
  data: string;
  type: "multi";
  langId: number;
  textitems: TextitemElement[];
}

interface SelectedTerm {
  data: number[];
  type: "select";
  textitems: TextitemElement[];
}

interface CopiedTerm {
  data: string;
  type: "copy";
}

interface NoTerm {
  data: null;
  type?: null;
}

export type ActiveTerm =
  | SingleTerm
  | MultiTerm
  | SelectedTerm
  | CopiedTerm
  | NoTerm
  | null;

interface ActiveTermContextValue {
  activeTerm: ActiveTerm;
  setActiveTerm: (termData: ActiveTerm, focusActiveSentence?: boolean) => void;
  clearActiveTerm: () => void;
}

const ActiveTermContext = createContext<ActiveTermContextValue | null>(null);

function ActiveTermProvider({ children }: { children: ReactNode }) {
  const [activeTerm, setActiveTerm] = useState<ActiveTerm>(null);

  function clearActiveTerm() {
    setActiveTerm({ data: null });
    resetFocusActiveSentence();
    startHoverMode();
    getTextContainer()?.classList.remove("term-active");
  }

  function handleSetActiveTerm(
    termData: ActiveTerm,
    focusActiveSentence = true
  ) {
    setActiveTerm(termData);

    if (!termData) return;
    if (termData.type !== "single" && termData.type !== "multi") return;

    if (focusActiveSentence) {
      fas(termData.textitems);
      getTextContainer()?.classList.add("term-active");
    }
  }

  const functions = useMemo(
    () => ({ setActiveTerm: handleSetActiveTerm, clearActiveTerm }),
    []
  );

  const value = useMemo(
    () => ({ ...functions, activeTerm }),
    [activeTerm, functions]
  );

  return (
    <ActiveTermContext.Provider value={value}>
      {children}
    </ActiveTermContext.Provider>
  );
}

export { ActiveTermProvider, ActiveTermContext };
