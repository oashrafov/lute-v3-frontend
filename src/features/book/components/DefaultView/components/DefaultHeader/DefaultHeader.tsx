import { Box, Divider, Group, Paper, Stack } from "@mantine/core";
import { PlayerSection } from "#book/components/common/PlayerSection";
import { FocusSwitch } from "#book/components/common/FocusSwitch/FocusSwitch";
import { HighlightsSwitch } from "#book/components/common/HighlightSwitch/HighlightSwitch";
import { PageControls } from "./components/PageControls/PageControls";
import { LogoSection } from "./components/LogoSection/LogoSection";
import { SideMenuButton } from "./components/SideMenuButton";
import { PageTermsButton } from "./components/PageTermsButton";
import { Toolbar } from "../Toolbar/Toolbar";
import { useBookQuery } from "#book/hooks/useBookQuery";
import classes from "./DefaultHeader.module.css";

export function DefaultHeader() {
  const { data: book } = useBookQuery();
  return (
    <>
      <Paper withBorder shadow="sm" className={`${classes.header} readpage`}>
        <Group wrap="nowrap" gap={10}>
          <SideMenuButton />
          <LogoSection />
          <Divider orientation="vertical" />
        </Group>

        <Stack gap={4}>
          <FocusSwitch />
          <HighlightsSwitch />
        </Stack>

        <Divider orientation="vertical" />

        <Stack gap={2}>
          <Toolbar />
          <PageTermsButton />
        </Stack>

        <Divider orientation="vertical" />

        <PageControls book={book} />
      </Paper>
      {book.audio && (
        <Box className={classes.playerContainer}>
          <PlayerSection />
        </Box>
      )}
    </>
  );
}
