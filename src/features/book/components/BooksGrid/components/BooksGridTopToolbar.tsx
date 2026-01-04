import type { Dispatch, SetStateAction } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ActionIcon,
  Group,
  InputClearButton,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { query } from "#settings/api/query";
import type { Shelf } from "#book/resources/types";

interface BooksGridTopToolbar {
  activeLang: string;
  setActiveLang: Dispatch<SetStateAction<string>>;
  shelf: Shelf;
  onSetShelf: Dispatch<SetStateAction<Shelf>>;
  sorting: string;
  onSetSorting: Dispatch<SetStateAction<string>>;
  sortingDirection: string;
  onSetSortDirection: Dispatch<SetStateAction<string>>;
  globalFilter: string;
  onSetGlobalFilter: Dispatch<SetStateAction<string>>;
  hasArchived: boolean;
}

export function BooksGridTopToolbar({
  activeLang,
  setActiveLang,
  shelf,
  onSetShelf,
  sorting,
  onSetSorting,
  sortingDirection,
  onSetSortDirection,
  globalFilter,
  onSetGlobalFilter,
  hasArchived,
}: BooksGridTopToolbar) {
  const { data: globalData } = useSuspenseQuery(query.globalData());

  const shelfSelectData = [
    { label: "Show: Active", value: "active" },
    {
      label: "Show: All",
      value: "all",
      disabled: !hasArchived,
    },
    {
      label: "Show: Archived",
      value: "archived",
      disabled: !hasArchived,
    },
  ] satisfies {
    label: string;
    value: Shelf;
    disabled?: boolean;
  }[];

  const sortSelectData = [
    { value: "title", label: "Title" },
    { value: "lastRead", label: "Last read date" },
    { value: "wordCount", label: "Word count" },
    { value: "status", label: "Status" },
  ];

  return (
    <Group justify="space-between" align="center" wrap="nowrap">
      <Stack gap={5} flex={1} align="flex-start" maw={240}>
        <Select
          value={shelf}
          onChange={(v) => onSetShelf((v as Shelf) ?? "active")}
          placeholder="Shelf"
          allowDeselect={false}
          data={shelfSelectData}
          clearable
          w="100%"
        />

        <Group gap={5} wrap="nowrap" align="center">
          <Select
            value={sorting}
            onChange={(v) => onSetSorting(v ?? "")}
            placeholder="Sort by"
            allowDeselect={false}
            data={sortSelectData}
            clearable
          />
          <Tooltip
            label={`Sorting direction: ${sortingDirection}`}
            disabled={!sorting}>
            <ActionIcon
              size="input-sm"
              variant="subtle"
              color="dimmed"
              disabled={!sorting}
              onClick={() =>
                onSetSortDirection((dir) => (dir === "desc" ? "asc" : "desc"))
              }>
              {sortingDirection === "desc" ? (
                <IconSortDescending />
              ) : (
                <IconSortAscending />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>

      <Stack gap={5} flex={1} align="flex-end" maw={240}>
        <TextInput
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => onSetGlobalFilter(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <InputClearButton
              onClick={() => onSetGlobalFilter("")}
              style={{ display: globalFilter ? undefined : "none" }}
            />
          }
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />

        <Select
          value={activeLang}
          onChange={(v) => setActiveLang(v ?? "")}
          placeholder="All languages"
          allowDeselect={false}
          data={globalData.languageChoices.map((language) => language.name)}
          clearable
          w="100%"
        />
      </Stack>
    </Group>
  );
}
