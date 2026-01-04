import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ActionIcon, Button, Group, Popover } from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import { SampleBooksSelect } from "#book/components/common/SampleBooksSelect/SampleBooksSelect";
import type { BooksListItem } from "#book/api/types";
import classes from "../BooksTable.module.css";

interface BookActions {
  table: MRT_TableInstance<BooksListItem>;
}

export function BookActions({ table }: BookActions) {
  const [opened, setOpened] = useState(false);

  function handleLoadBooks(langName: string) {
    table.setColumnFilters([{ id: "language", value: langName }]);
  }

  function handleConfirmSelect() {
    setOpened(false);
  }

  function handleTogglePopup() {
    setOpened((v) => !v);
  }

  return (
    <Group gap={0} wrap="nowrap">
      <Button
        renderRoot={(props) => <Link to="/create-book" {...props} />}
        color="green"
        size="xs"
        leftSection={<IconPlus size={22} />}
        className={classes.button}>
        New
      </Button>
      <Popover shadow="md" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <ActionIcon
            color="green"
            onClick={handleTogglePopup}
            size={30}
            className={classes.menu}>
            <IconChevronDown stroke={1.5} size={20} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p={10}>
          <SampleBooksSelect
            label="Load sample books"
            description="Load predefined language sample books"
            placeholder="e.g Arabic"
            onSuccess={handleLoadBooks}
            onConfirm={handleConfirmSelect}
          />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
}
