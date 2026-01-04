import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
} from "mantine-react-table";
import { StatusRadio } from "../StatusRadio/StatusRadio";
import { TagsGroup } from "#common/TagsGroup/TagsGroup";
import { LanguageCell } from "#common/LanguageCell/LanguageCell";
import { TermCell } from "./components/TermCell";
import { TranslationCell } from "./components/TranslationCell";
import { StatusCell } from "./components/StatusCell";
import { EditButtonsCell } from "../EditButtonsCell/EditButtonsCell";
import { ParentEdit } from "./components/ParentEdit";
import { TranslationEdit } from "./components/TranslationEdit";
import { TagsEdit } from "./components/TagsEdit";
import { STATUS_LABEL } from "#resources/constants";
import type { Status } from "#resources/types";
import type { TermsListItem } from "#term/api/types";
import type { LanguageChoice } from "#settings/api/types";

const statusLabel = {
  ...STATUS_LABEL,
  6: STATUS_LABEL[99],
  7: STATUS_LABEL[98],
};

const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export const columnDefinition = (
  languageChoices: LanguageChoice[],
  tagChoices: string[],
  setColumnFilters: Dispatch<SetStateAction<MRT_ColumnFiltersState>>
): MRT_ColumnDef<TermsListItem>[] => [
  {
    header: "TERM",
    accessorKey: "text",
    minSize: 300,
    enableEditing: false,
    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    Cell: ({ row }) => <TermCell row={row} />,
  },
  {
    header: "PARENT",
    accessorKey: "parents",
    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    minSize: 200,
    enableEditing: true,
    Cell: ({ row }) => <TagsGroup tags={row.original.parents} />,
    Edit: ({ row, cell }) => <ParentEdit row={row} cell={cell} />,
  },
  {
    header: "TRANSLATION",
    accessorKey: "translation",
    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    minSize: 300,
    size: 400,
    enableEditing: true,
    Cell: ({ row }) => <TranslationCell row={row} />,
    Edit: ({ row, cell }) => <TranslationEdit row={row} cell={cell} />,
  },
  {
    header: "TAGS",
    id: "tags",
    accessorKey: "tags",
    mantineFilterSelectProps: {
      data: tagChoices,
    },
    enableEditing: true,
    filterVariant: "select",
    columnFilterModeOptions: null,
    Cell: ({ row }) => <TagsGroup tags={row.original.tags} />,
    Edit: ({ cell }) => <TagsEdit cell={cell} tagChoices={tagChoices} />,
  },
  {
    header: "STATUS",
    id: "status",
    filterVariant: "range-slider",
    enableColumnFilterModes: false,
    size: 210,
    enableEditing: true,
    accessorFn: (row) => {
      const statusId = row.status;
      return statusId === 98 ? 7 : statusId === 99 ? 6 : statusId;
    },
    Cell: ({ row }) => {
      const statusId = row.original.status;
      return (
        <StatusCell
          statusId={statusId}
          badgeLabel={statusLabel[statusId as Status | 6 | 7]}
          onSetColumnFilters={setColumnFilters}
        />
      );
    },
    Edit: ({ row, cell }) => {
      const [value, setValue] = useState(String(row.original.status));
      return (
        <StatusRadio
          size="sm"
          value={value}
          onChange={(v) => {
            cell.row._valuesCache[cell.column.id] = v;
            setValue(v);
          }}
        />
      );
    },
    mantineFilterRangeSliderProps: {
      min: 0,
      max: 7,
      step: 1,
      minRange: 0,
      marks: [
        { value: 0 },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
      ],
      label: (value) => statusLabel[value as Status | 6 | 7],
    },
  },
  {
    header: "LANGUAGE",
    accessorKey: "languageName",
    filterVariant: "select",
    columnFilterModeOptions: null,
    enableEditing: false,
    mantineFilterSelectProps: {
      data: languageChoices.map((lang) => lang.name),
    },
    Cell: ({ row }) => (
      <LanguageCell
        language={row.original.languageName}
        onSetColumnFilters={setColumnFilters}
      />
    ),
  },
  {
    header: "ADDED ON",
    id: "createdAt",
    filterVariant: "date-range",
    accessorFn: (originalRow) => new Date(originalRow.createdAt),
    columnFilterModeOptions: null,
    enableEditing: false,
    Cell: ({ cell }) => {
      const cellValue = cell.getValue();
      return (
        typeof cellValue === "number" && (
          <span>{dateFormatter.format(cellValue)}</span>
        )
      );
    },
  },
  {
    id: "actions",
    header: "",
    columnDefType: "display",
    size: 0,
    Cell: ({ row, table }) => {
      const isEditing = table.getState().editingRow?.id === row.id;
      return <EditButtonsCell row={row} table={table} isEditing={isEditing} />;
    },
  },
];
