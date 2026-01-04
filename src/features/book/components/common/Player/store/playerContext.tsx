import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

const player = new Audio();

interface PlayerContextValue {
  player: HTMLAudioElement;
  skipAmount: number;
  setSkipAmount: Dispatch<SetStateAction<number>>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

const initialState = {
  skipAmount: 5,
};

function PlayerProvider({ children }: { children: ReactNode }) {
  const [skipAmount, setSkipAmount] = useState(initialState.skipAmount);

  return (
    <PlayerContext.Provider value={{ skipAmount, setSkipAmount, player }}>
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerProvider, PlayerContext };
