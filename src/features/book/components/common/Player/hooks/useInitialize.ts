import { useEffect } from "react";
import { usePlayerContext } from "./usePlayerContext";
import { useAudioDataContext } from "./useAudioDataContext";

export function useInitialize(source?: string) {
  const { player } = usePlayerContext();
  const audioData = useAudioDataContext();

  useEffect(() => {
    if (source) {
      player.src = source;
      player.currentTime = audioData.position;
    }
  }, [player, source, audioData.position]);
}
