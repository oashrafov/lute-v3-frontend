import {
  useNavigate,
  useRouterState,
  useSearch,
  type ValidateFromPath,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Group, Radio, ScrollArea, type RadioGroupProps } from "@mantine/core";
import { LanguageCard } from "../LanguageCard/LanguageCard";
import { query } from "#language/api/query";
import classes from "./LanguageCards.module.css";

export function LanguageCards({
  label,
  description,
}: Omit<RadioGroupProps, "children">) {
  const { data: languages } = useSuspenseQuery(query.list());
  const { langId } = useSearch({ strict: false });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate({ from: pathname as ValidateFromPath });

  const languagesSorted = languages.toSorted((a, b) => b.id - a.id);

  function handleLanguageChange(id: number) {
    navigate({
      search: (prev) => ({
        ...prev,
        langId: langId === id ? undefined : id,
        textDir: languages.find((land) => land.id === id)?.textDirection,
        langName: undefined,
      }),
    });
  }

  return (
    <Radio.Group
      label={label}
      description={description}
      name="langs"
      value={String(langId)}
      onChange={(id) => handleLanguageChange(Number(id))}>
      <ScrollArea type="scroll" offsetScrollbars="x">
        <Group gap={2} wrap="nowrap" align="stretch">
          {languagesSorted.map((data) => (
            <Radio.Card
              key={data.id}
              value={String(data.id)}
              className={classes.card}>
              <Group wrap="nowrap" align="flex-start" gap={8}>
                <Radio.Indicator size="xs" />
                <LanguageCard data={data} />
              </Group>
            </Radio.Card>
          ))}
        </Group>
      </ScrollArea>
    </Radio.Group>
  );
}
