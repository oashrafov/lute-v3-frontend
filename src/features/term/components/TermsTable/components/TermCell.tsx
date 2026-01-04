import { Link } from "@tanstack/react-router";
import { Button, Text } from "@mantine/core";
import type { MRT_Row } from "mantine-react-table";
import type { TermsListItem } from "#term/api/types";

interface TermCell {
  row: MRT_Row<TermsListItem>;
}

export function TermCell({ row }: TermCell) {
  return (
    <Button
      maw={290}
      variant="subtle"
      size="compact-sm"
      renderRoot={(props) => (
        <Link
          to="/terms/$termId"
          params={{ termId: row.original.id }}
          {...props}
        />
      )}
      style={{ color: "inherit", textDecoration: "none" }}>
      <Text size="sm" lineClamp={1} truncate>
        {row.original.text}
      </Text>
    </Button>
  );
}
