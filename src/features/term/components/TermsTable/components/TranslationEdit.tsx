import { useState } from "react";
import { Image, Textarea } from "@mantine/core";
import type { MRT_Cell, MRT_Row } from "mantine-react-table";
import { BACKEND_URL } from "#resources/constants";
import type { TermsListItem } from "#term/api/types";

interface TranslationEdit {
  row: MRT_Row<TermsListItem>;
  cell: MRT_Cell<TermsListItem, unknown>;
}

export function TranslationEdit({ row, cell }: TranslationEdit) {
  const cellValue = cell.getValue();
  const [value, setValue] = useState(
    typeof cellValue === "string" ? cellValue : ""
  );
  const img = row.original.imageSource;
  return (
    <>
      <Textarea
        wrapperProps={{ dir: row.original.textDirection }}
        rows={1}
        size="xs"
        autosize
        spellCheck={false}
        autoCapitalize="off"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          cell.row._valuesCache[cell.column.id] = e.target.value;
        }}
      />
      {img && (
        <Image mt={5} src={`${BACKEND_URL}${img}`} radius={5} h={50} w={50} />
      )}
    </>
  );
}
