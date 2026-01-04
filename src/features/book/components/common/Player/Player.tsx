import { Group } from "@mantine/core";
import { PlayerControlsMenu } from "./components/PlayerControlsMenu";
import { SkipControls } from "./components/SkipControls";
import { TimeSlider } from "./components/TimeSlider";
import { VolumeSlider } from "./components/VolumeSlider";
import { PlayButton } from "./components/PlayButton/PlayButton";
import { SkipBackButton } from "./components/SkipBackButton";
import { CurrentTimeDisplay } from "./components/CurrentTimeDisplay";
import { DurationDisplay } from "./components/DurationDisplay";
import { PlayerMenuButton } from "./components/PlayerMenuButton";
import { useInitialize } from "./hooks/useInitialize";
import classes from "./Player.module.css";

interface Player {
  source?: string;
}

export function Player({ source }: Player) {
  useInitialize(source);
  return (
    <div className={classes.container}>
      <Group gap={8} wrap="nowrap">
        <SkipBackButton disabled={!source} />
        <Group pos="relative" display="flex" align="center">
          <PlayButton disabled={!source} />
          <SkipControls disabled={!source} />
        </Group>
      </Group>

      <Group justify="space-between" flex={1} wrap="nowrap" gap={5}>
        <CurrentTimeDisplay disabled={!source} />
        <TimeSlider disabled={!source} />
        <DurationDisplay disabled={!source} />
      </Group>

      <VolumeSlider disabled={!source} />

      <PlayerControlsMenu>
        <PlayerMenuButton disabled={!source} />
      </PlayerControlsMenu>
    </div>
  );
}
