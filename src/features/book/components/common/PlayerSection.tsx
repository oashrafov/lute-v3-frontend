import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Player } from "./Player/Player";
import { MediaNotFoundOverlay } from "./Player/components/MediaNotFoundOverlay/MediaNotFoundOverlay";
import { errorMessage } from "#resources/notifications";
import { query } from "#book/api/query";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function PlayerSection() {
  const { bookId } = route.useParams();
  const { data, isError, error } = useQuery(query.audioSrc(bookId));

  useEffect(() => {
    if (error) {
      notifications.show(errorMessage(error.message));
    }
  }, [error]);

  return (
    <>
      {isError && <MediaNotFoundOverlay />}
      <Player source={data} />
    </>
  );
}
