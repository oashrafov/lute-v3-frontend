import type { ReactNode } from "react";
import { Menu } from "@mantine/core";
import { PlaybackRateControls } from "./PlaybackRateControls";
import { PlayerBookmarkControls } from "./PlayerBookmarkControls";
import { SkipAmountSelect } from "./SkipAmountSelect";

interface PlayerControlsMenu {
  children: ReactNode;
}

export function PlayerControlsMenu({ children }: PlayerControlsMenu) {
  return (
    <Menu position="bottom" offset={0} shadow="md" closeOnItemClick={false}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="div">
          <PlaybackRateControls />
        </Menu.Item>

        <Menu.Item component="div">
          <PlayerBookmarkControls />
        </Menu.Item>

        <Menu.Item component="div">
          <SkipAmountSelect />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
