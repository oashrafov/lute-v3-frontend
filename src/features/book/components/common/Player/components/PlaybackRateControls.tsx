import { useEffect, useState } from "react";
import {
  ActionIcon,
  ActionIconGroup,
  ActionIconGroupSection,
  InputLabel,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { usePlayerContext } from "../hooks/usePlayerContext";

const PLAYBACK_RATE_STEP = 0.1;
const MIN_PLAYBACK_RATE = 0.1;
const MAX_PLAYBACK_RATE = 10.0;

export function PlaybackRateControls() {
  const { player } = usePlayerContext();
  const [rate, setRate] = useState(player.playbackRate);

  function handlePlaybackRateChange(delta: number) {
    const playbackRate = Math.min(
      Math.max((player.playbackRate += delta), MIN_PLAYBACK_RATE),
      MAX_PLAYBACK_RATE
    );
    player.playbackRate = playbackRate;
  }

  function handlePlaybackRateReset() {
    player.playbackRate = 1.0;
  }

  function handleSetPlaybackRate(rate: number) {
    return () => handlePlaybackRateChange(rate);
  }

  useEffect(() => {
    function handleRateChange() {
      setRate(player.playbackRate);
    }
    player.addEventListener("ratechange", handleRateChange);
    return () => player.removeEventListener("ratechange", handleRateChange);
  }, [player]);

  return (
    <Stack gap={0} align="center">
      <InputLabel fz="xs">Playback rate</InputLabel>
      <ActionIconGroup style={{ alignItems: "center" }}>
        <ActionIcon
          onClick={handleSetPlaybackRate(-PLAYBACK_RATE_STEP)}
          size="xs">
          <IconMinus size="80%" />
        </ActionIcon>
        <ActionIconGroupSection variant="transparent">
          <Tooltip label="Click to reset" fz="xs">
            <UnstyledButton
              miw={20}
              fz="sm"
              ta="center"
              onClick={handlePlaybackRateReset}>
              {rate.toFixed(1)}
            </UnstyledButton>
          </Tooltip>
        </ActionIconGroupSection>
        <ActionIcon
          onClick={handleSetPlaybackRate(PLAYBACK_RATE_STEP)}
          size="xs">
          <IconPlus size="80%" />
        </ActionIcon>
      </ActionIconGroup>
    </Stack>
  );
}
