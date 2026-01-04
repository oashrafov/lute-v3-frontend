import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@mantine/core";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import type { MRT_ColumnFiltersState } from "mantine-react-table";

interface StatusCell {
  statusId: number;
  onSetColumnFilters: Dispatch<SetStateAction<MRT_ColumnFiltersState>>;
  badgeLabel: string;
}

const statusObj: Record<number, { id: number; icon: JSX.Element }> = {
  98: {
    id: 7,
    icon: <IconMinus size={16} />,
  },
  99: {
    id: 6,
    icon: <IconCheck size={16} />,
  },
};

export function StatusCell({
  statusId,
  badgeLabel,
  onSetColumnFilters,
}: StatusCell) {
  const id = statusObj[statusId]?.id ?? statusId;
  const label = statusObj[statusId]?.icon ?? String(statusId);

  const statusFilter = {
    id: "status",
    value: [id, id],
  };

  const defaultFilter = {
    id: "status",
    value: [0, 6],
  };

  function handleSetFilter() {
    onSetColumnFilters((filters) => {
      const otherFilters = filters.filter((filter) => filter.id !== "status");
      const statusFilters = filters.filter((filter) => filter.id === "status");
      const filter = statusFilters[0].value as number[];

      return filter[0] === id && filter[1] === id
        ? [...otherFilters, defaultFilter]
        : [...otherFilters, statusFilter];
    });
  }

  return (
    <Badge
      fw={600}
      fullWidth
      size="md"
      onClick={handleSetFilter}
      leftSection={label}
      style={{ cursor: "pointer" }}
      c={`var(--lute-text-color-status${statusId})`}
      bg={`var(--lute-color-highlight-status${statusId}`}>
      {badgeLabel}
    </Badge>
  );
}
