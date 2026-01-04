import { useEffect, useState } from "react";
import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { usePlayerContext } from "../../hooks/usePlayerContext";
import classes from "./PlayButton.module.css";

interface PlayerPlayButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function PlayButton(props: PlayerPlayButton) {
  const { player } = usePlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayPause() {
    setIsPlaying((playing) => {
      if (playing) {
        player.pause();
      } else {
        player.play();
      }
      return !playing;
    });
  }

  useEffect(() => {
    function resetPlayer() {
      player.pause();
      setIsPlaying(false);
    }
    player.addEventListener("loadedmetadata", resetPlayer);
    return () => player.removeEventListener("loadedmetadata", resetPlayer);
  }, [player, setIsPlaying]);

  return (
    <ActionIcon
      size={34}
      onClick={handlePlayPause}
      className={classes.btn}
      {...props}>
      {isPlaying && <IconPlayerPauseFilled />}
      {!isPlaying && <IconPlayerPlayFilled />}
    </ActionIcon>
  );
}
