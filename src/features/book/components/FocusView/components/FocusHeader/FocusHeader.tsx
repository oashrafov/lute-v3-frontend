import { Box, Divider, Paper, Stack } from "@mantine/core";
import { NavLogo } from "#common/NavLogo/NavLogo";
import { ThemeSelect } from "#common/ThemeSelect/ThemeSelect";
import { BookTitle } from "#book/components/common/BookTitle";
import { PageCounter } from "#book/components/common/PageCounter";
import { BookSourceButton } from "#book/components/common/BookSourceButton";
import { FocusSwitch } from "#book/components/common/FocusSwitch/FocusSwitch";
import { HighlightsSwitch } from "#book/components/common/HighlightSwitch/HighlightSwitch";
import { PlayerSection } from "#book/components/common/PlayerSection";
import { useBookQuery } from "#book/hooks/useBookQuery";
import classes from "./FocusHeader.module.css";

export function FocusHeader() {
  const { data: book } = useBookQuery();
  return (
    <Paper withBorder radius={0} shadow="sm" className={classes.header}>
      <NavLogo />

      <Divider orientation="vertical" />

      <Stack gap={4} p={5}>
        <FocusSwitch />
        <HighlightsSwitch />
      </Stack>

      <Divider orientation="vertical" />

      <Stack flex={1} gap={8}>
        <div className={classes.inner}>
          <BookTitle>{book.title}</BookTitle>
          {book.source && <BookSourceButton source={book.source} />}
          <PageCounter pageCount={book.pageCount} />
        </div>
        {book.audio && (
          <Box className={classes.playerContainer}>
            <PlayerSection />
          </Box>
        )}
      </Stack>

      <Divider orientation="vertical" />

      <ThemeSelect />
    </Paper>
  );
}
