import type { Dispatch, SetStateAction } from "react";
import { UnstyledButton } from "@mantine/core";
import type { MRT_ColumnFiltersState } from "mantine-react-table";

interface LanguageCell {
  language: string;
  onSetColumnFilters: Dispatch<SetStateAction<MRT_ColumnFiltersState>>;
}

export function LanguageCell({ language, onSetColumnFilters }: LanguageCell) {
  function handleSetFilter() {
    onSetColumnFilters((filters) => {
      const otherFilters = filters.filter((filter) => filter.id !== "language");
      const languageFilters = filters.filter(
        (filter) => filter.id === "language"
      );
      const sameFilter = languageFilters[0]?.value === language;

      if (sameFilter) {
        return otherFilters;
      } else {
        return [...otherFilters, { id: "language", value: language }];
      }
    });
  }

  return (
    <UnstyledButton fz="sm" onClick={handleSetFilter}>
      {language}
    </UnstyledButton>
  );
}
