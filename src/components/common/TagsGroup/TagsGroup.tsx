import { Pill, PillGroup } from "@mantine/core";
import classes from "./TagsGroup.module.css";

interface TagsGroup {
  tags: string[];
}

export function TagsGroup({ tags }: TagsGroup) {
  return (
    <PillGroup gap={4}>
      {tags.map((tag) => (
        <Pill
          key={tag}
          classNames={{
            root: classes.pill,
          }}>
          {tag}
        </Pill>
      ))}
    </PillGroup>
  );
}
