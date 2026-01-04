import { useState } from "react";
import { TagsInput } from "@mantine/core";
import type { MRT_Cell } from "mantine-react-table";
import type { TermsListItem } from "#term/api/types";

interface TagsEdit {
  cell: MRT_Cell<TermsListItem, unknown>;
  tagChoices: string[];
}

export function TagsEdit({ cell, tagChoices }: TagsEdit) {
  const cellValue = cell.getValue();
  const tagsList =
    typeof cellValue === "string" && cellValue ? cellValue.split(",") : [];
  const [value, setValue] = useState(tagsList);

  return (
    <TagsInput
      size="xs"
      w={160}
      data={tagChoices}
      value={value}
      onChange={(tags) => {
        cell.row._valuesCache[cell.column.id] = tags.join(",");
        setValue(tags);
      }}
    />
  );
}
