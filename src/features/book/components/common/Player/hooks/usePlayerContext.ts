import { useContext } from "react";
import { PlayerContext } from "../store/playerContext";

export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("Can't use outside of context");
  }

  return context;
}
