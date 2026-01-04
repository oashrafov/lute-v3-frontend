import { Divider, List, ListItem, Paper, Text } from "@mantine/core";
import type { SentenceReferenceData } from "#term/api/types";
import { SentenceReference } from "../SentenceReference/SentenceReference";
import classes from "./TermVariationItem.module.css";

interface TermVariationItem {
  term: string;
  references: SentenceReferenceData[];
}

export function TermVariationItem({ term, references }: TermVariationItem) {
  return (
    <Paper withBorder radius={4} style={{ overflow: "hidden" }}>
      <Text className={classes.term}>{term}</Text>
      <Divider />
      <List px={16} py={8} listStyleType="disc" spacing="sm">
        {references.map((reference) => (
          <ListItem key={reference.id} pl={0}>
            <SentenceReference data={reference} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
