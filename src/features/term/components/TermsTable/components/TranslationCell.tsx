import { Text } from "@mantine/core";
import type { MRT_Row } from "mantine-react-table";
import type { TermsListItem } from "#term/api/types";
import { TermImagePopover } from "../../TermImagePopover/TermImagePopover";

interface TranslationCell {
  row: MRT_Row<TermsListItem>;
}

export function TranslationCell({ row }: TranslationCell) {
  const img = row.original.imageSource;
  const langId = row.original.languageId;
  return (
    <>
      <Text size="sm" component="span" style={{ whiteSpace: "pre" }}>
        {row.original.translation}
      </Text>
      {img && (
        <TermImagePopover
          position="right"
          imageName={`userimages/${langId}/${img}`}
        />
      )}
    </>
  );
}
