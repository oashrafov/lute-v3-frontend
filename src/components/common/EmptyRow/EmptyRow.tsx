import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Text } from "@mantine/core";
import { query } from "#settings/api/query";

interface EmptyRow {
  tableName: "terms" | "books";
  language: string;
}

export function EmptyRow({ tableName, language }: EmptyRow) {
  const { data } = useSuspenseQuery(query.globalData());
  const langId = data.languageChoices.filter(
    (lang) => lang.name === language
  )[0].id;
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Text component="p" fz="sm" mb={8}>
        No {tableName} found for <strong>{language}</strong>.
      </Text>
      <Button
        renderRoot={(props) => (
          <Link to="/create-book" params={{ langId }} {...props} />
        )}>
        Create one?
      </Button>
    </div>
  );
}
