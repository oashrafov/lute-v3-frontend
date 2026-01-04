import { useEffect, useState } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { PlayerTimecode } from "./PlayerTimecode";

interface DurationDisplay {
  disabled?: boolean;
}

export function DurationDisplay({ disabled }: DurationDisplay) {
  const { player } = usePlayerContext();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    function handleDurationChange() {
      setDuration(player.duration);
    }
    player.addEventListener("durationchange", handleDurationChange);
    return () => {
      player.removeEventListener("durationchange", handleDurationChange);
    };
  }, [player]);

  return <PlayerTimecode time={duration} ta="right" disabled={disabled} />;
}
