import { useQuery } from "@tanstack/react-query";
import { DonutChart } from "@mantine/charts";
import { query } from "#book/api/query";

const labels: Record<string, string> = {
  0: "Unknown",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  99: "Well Known or Ignored",
};

export function StatsChart({ bookId }: { bookId: number }) {
  const { data } = useQuery(query.stats(bookId));

  if (!data) return;

  return (
    <DonutChart
      withTooltip={false}
      size={90}
      thickness={16}
      styles={{ label: { fontSize: "0.7rem" } }}
      data={Object.entries(data)
        .filter(([, value]) => value.percentage > 1)
        .map(([id, value]) => ({
          name: labels[id],
          value: value.percentage,
          color: `var(--lute-color-highlight-status${id}`,
        }))}
      chartLabel="Statuses"
    />
  );
}
