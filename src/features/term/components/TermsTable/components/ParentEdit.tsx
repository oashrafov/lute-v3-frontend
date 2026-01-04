import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TagsInput } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import { query } from "#term/api/query";
import type { TermsListItem } from "#term/api/types";
import { buildSuggestionsList } from "#helpers/term";
import { MAX_TERM_SUGGESTIONS } from "#resources/constants";

interface ParentEdit {
  row: MRT_Row<TermsListItem>;
  cell: MRT_Cell<TermsListItem, unknown>;
}

export function ParentEdit({ row, cell }: ParentEdit) {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(row.original.parents);
  const { data } = useQuery(
    query.termSuggestions(search, row.original.languageId)
  );

  const suggestions = data
    ? buildSuggestionsList(
        data.filter((d) => d.text !== row.original.text)
      ).map((item) => item.suggestion)
    : [];

  return (
    <TagsInput
      size="xs"
      w={160}
      searchValue={search}
      onSearchChange={setSearch}
      data={suggestions}
      limit={MAX_TERM_SUGGESTIONS}
      value={value}
      onChange={(parents) => {
        cell.row._valuesCache[cell.column.id] = parents.join(",");
        setValue(parents);
      }}
    />
  );
}
