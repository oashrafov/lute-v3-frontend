import { useEffect, useMemo, useState } from "react";
import { Slider, type SliderProps } from "@mantine/core";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAudioDataContext } from "../hooks/useAudioDataContext";
import { useUpdateAudioMutate } from "../hooks/useUpdateAudioMutate";
import { throttle } from "#utils/utils";
import classes from "../Player.module.css";

export function TimeSlider(props: SliderProps) {
  const { player } = usePlayerContext();
  const audioData = useAudioDataContext();
  const [position, setPosition] = useState(player.currentTime);
  const [duration, setDuration] = useState(0);
  const mutateAudioData = useUpdateAudioMutate();

  const marks = useMemo(
    () =>
      !props.disabled
        ? audioData.bookmarks.map((bookmark) => ({ value: bookmark }))
        : [],
    [audioData.bookmarks, props.disabled]
  );

  function handleChangeTime(v: number) {
    player.currentTime = v;
    // optimize. changing currentTime triggers ontimeupdate cb and it causes another post request
    mutateAudioData(audioData.id, undefined, v);
  }

  useEffect(() => {
    const updateAudioPosition = throttle(() => {
      mutateAudioData(audioData.id, undefined, player.currentTime);
    }, 2000);
    player.addEventListener("timeupdate", updateAudioPosition);
    return () => player.removeEventListener("timeupdate", updateAudioPosition);
  }, [audioData.id, mutateAudioData, player]);

  useEffect(() => {
    function resetPlayer() {
      setPosition(0);
      setDuration(player.duration);
    }

    function handleTimeUpdate() {
      setPosition(player.currentTime);
    }

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("loadedmetadata", resetPlayer);
    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("loadedmetadata", resetPlayer);
    };
  }, [player]);

  return (
    <Slider
      label={null}
      marks={marks}
      min={0}
      max={duration}
      step={0.1}
      value={position}
      onChange={handleChangeTime}
      classNames={{
        root: classes.timeSlider,
        mark: classes.mark,
        thumb: classes.thumb,
      }}
      size="md"
      thumbSize={12}
      {...props}
    />
  );
}
