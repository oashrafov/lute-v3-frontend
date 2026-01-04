import { useEffect, useState } from "react";
import { PlayerTimecode } from "./PlayerTimecode";
import { usePlayerContext } from "../hooks/usePlayerContext";

interface CurrentTimeDisplay {
  disabled?: boolean;
}

export function CurrentTimeDisplay({ disabled }: CurrentTimeDisplay) {
  const { player } = usePlayerContext();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    function updateTime() {
      setCurrentTime(player.currentTime);
    }
    player.addEventListener("timeupdate", updateTime);
    return () => {
      player.removeEventListener("timeupdate", updateTime);
    };
  }, [player]);

  return <PlayerTimecode time={currentTime} ta="left" disabled={disabled} />;
}
