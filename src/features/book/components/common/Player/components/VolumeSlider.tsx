import { useState } from "react";
import { Slider, type SliderProps } from "@mantine/core";
import { usePlayerContext } from "../hooks/usePlayerContext";
import classes from "../Player.module.css";

export function VolumeSlider(props: SliderProps) {
  const { player } = usePlayerContext();
  const [volume, setVolume] = useState(1);

  function handleVolumeChange(volume: number) {
    player.volume = volume;
    setVolume(volume);
  }

  return (
    <Slider
      size="sm"
      min={0}
      max={1}
      step={0.05}
      value={volume}
      onChange={handleVolumeChange}
      classNames={{ root: classes.volumeSlider, thumb: classes.thumb }}
      {...props}
    />
  );
}
