import { Box, Group, Image, Text, Tooltip } from "@mantine/core";
import { TagsGroup } from "#common/TagsGroup/TagsGroup";
import { TermPopupContentSection } from "./TermPopupContentSection";
import type { TermPopup } from "#term/api/types";
import { BACKEND_URL } from "#resources/constants";

interface TermPopupContent {
  data: TermPopup;
}

export function TermPopupContent({ data }: TermPopupContent) {
  return (
    <Box maw={400} fz={15}>
      <Group gap={5} wrap="nowrap">
        <Text span fw={700}>
          {data.text}
        </Text>
        {data.tags.length > 0 && <TagsGroup tags={data.tags} />}
      </Group>

      {data.pronunciation && <em>{data.pronunciation}</em>}

      {data.imageData &&
        Object.entries(data.imageData).map(([img, tooltip]) => (
          <Tooltip key={img} label={tooltip}>
            <Image fit="cover" w={150} h={150} src={`${BACKEND_URL}${img}`} />
          </Tooltip>
        ))}

      {data.translation && (
        <Text mt="sm" dangerouslySetInnerHTML={{ __html: data.translation }} />
      )}

      {data.parents.length > 0 && (
        <TermPopupContentSection data={data.parents} />
      )}

      {data.components.length > 0 && (
        <>
          <Text mt="sm" fs="italic">
            Components
          </Text>
          <TermPopupContentSection data={data.components} />
        </>
      )}
    </Box>
  );
}
