import { Image } from "@mantine/core";
import { FAVICON_SOURCE_URL } from "#resources/constants";

export function DictFavicon({ hostname }: { hostname: string }) {
  return <Image h={16} w={16} src={`${FAVICON_SOURCE_URL}${hostname}`} />;
}
