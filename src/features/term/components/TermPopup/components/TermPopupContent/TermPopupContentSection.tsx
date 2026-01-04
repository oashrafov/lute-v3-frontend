import { Box, Group, Text } from "@mantine/core";
import { TagsGroup } from "#common/TagsGroup/TagsGroup";
import type { TermPopupSection } from "#term/api/types";

interface TermPopupContentSection {
  data: TermPopupSection[];
}

export function TermPopupContentSection({ data }: TermPopupContentSection) {
  return data.map((d, index) => (
    <Box key={index} mt={5}>
      <Group gap={5} wrap="nowrap">
        <Text span fw={700} dangerouslySetInnerHTML={{ __html: d.text }} />
        {d.pronunciation && <em>({d.pronunciation})</em>}
        {d.tags.length > 0 && <TagsGroup tags={d.tags} />}
      </Group>
      {d.translation && (
        <Text span dangerouslySetInnerHTML={{ __html: d.translation }} />
      )}
    </Box>
  ));
}
