import { useEffect, useMemo, useState } from "react";
import { ActionIcon, ActionIconGroup, InputLabel, Stack } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAudioDataContext } from "../hooks/useAudioDataContext";
import { useUpdateAudioMutate } from "../hooks/useUpdateAudioMutate";
import classes from "../Player.module.css";

export function PlayerBookmarkControls() {
  const { player } = usePlayerContext();
  const audioData = useAudioDataContext();
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const mutateAudioData = useUpdateAudioMutate();

  const bookmarks = useMemo(() => audioData.bookmarks, [audioData.bookmarks]);

  function handleSaveRemoveBookmark() {
    let newBookmarks = [];
    const rounded = parseFloat(player.currentTime.toFixed(1));
    if (bookmarks.includes(rounded)) {
      newBookmarks = bookmarks.filter((b) => b !== rounded);
    } else {
      newBookmarks = [...bookmarks, rounded].sort((a, b) => a - b);
    }

    mutateAudioData(audioData.id, newBookmarks.join(";"));
  }

  function handleSkipToBookmark(direction: "next" | "prev") {
    let val;
    const currentTime = player.currentTime;
    if (direction === "next") {
      val = bookmarks.find((val) => val > currentTime);
    } else {
      val = bookmarks.findLast((val) => val < currentTime);
    }

    if (!val) return;

    player.currentTime = val;
    mutateAudioData(audioData.id, undefined, val);
  }

  useEffect(() => {
    function highlightActiveBookmark() {
      const rounded = parseFloat(player.currentTime.toFixed(1));
      setIsBookmarkActive(bookmarks.includes(rounded));
    }

    player.addEventListener("timeupdate", highlightActiveBookmark);
    return () =>
      player.removeEventListener("timeupdate", highlightActiveBookmark);
  }, [bookmarks, player]);

  return (
    <Stack gap={0} align="center">
      <InputLabel fz="xs">Bookmarks</InputLabel>
      <ActionIconGroup className={classes.bookmarkControls}>
        <ActionIcon
          size={24}
          p={0}
          variant="transparent"
          onClick={handleSaveRemoveBookmark}
          styles={{ root: { border: "none" } }}>
          {isBookmarkActive ? <IconBookmarkFilled /> : <IconBookmark />}
        </ActionIcon>
        <ActionIconGroup>
          <ActionIcon
            disabled={bookmarks.length === 0}
            onClick={() => handleSkipToBookmark("prev")}
            radius="50%"
            size="sm">
            <IconChevronLeft />
          </ActionIcon>
          <ActionIcon
            disabled={bookmarks.length === 0}
            onClick={() => handleSkipToBookmark("next")}
            radius="50%"
            size="sm">
            <IconChevronRight />
          </ActionIcon>
        </ActionIconGroup>
      </ActionIconGroup>
    </Stack>
  );
}
