import { type ReactNode } from "react";
import { Divider, Menu, Text } from "@mantine/core";
import { BookmarksAccordion } from "./BookmarksAccordion";
import type { Bookmarks } from "#book/api/types";

interface BookmarksMenu {
  data: Bookmarks;
  children: ReactNode;
}

export function BookmarksMenu({ data, children }: BookmarksMenu) {
  const bookmarkCount = Object.values(data).reduce(
    (acc, current) => acc + current.sentences.length,
    0
  );
  const pageCount = Object.keys(data).length;

  return (
    <Menu trigger="click" position="bottom-start" withArrow>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown p={0}>
        <>
          <Text p="xs" fz="sm" ta="center">
            {bookmarkCount} bookmarks in {pageCount} page(s)
          </Text>

          <Divider />

          <BookmarksAccordion bookmarks={data} />
        </>
      </Menu.Dropdown>
    </Menu>
  );
}
