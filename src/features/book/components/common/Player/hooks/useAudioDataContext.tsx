import { useContext } from "react";
import { AudioDataContext } from "../store/audioDataContext";

export function useAudioDataContext() {
  const context = useContext(AudioDataContext);

  if (!context) {
    throw new Error("Can't use outside of context");
  }

  return context;
}
