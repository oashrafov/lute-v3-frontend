import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Select, type SelectProps } from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import { LoadSampleBooksButton } from "./LoadSampleBooksButton";
import { query as langQuery } from "#language/api/query";
import { query as settingsQuery } from "#settings/api/query";

interface SampleBooksSelect extends SelectProps {
  onSuccess?: (arg: string) => void;
  onConfirm?: () => void;
}

export function SampleBooksSelect({
  onSuccess,
  onConfirm,
  ...props
}: SampleBooksSelect) {
  const { data: globalData } = useSuspenseQuery(settingsQuery.globalData());
  const { data: languagePresets } = useSuspenseQuery(langQuery.presetsList());
  const [langName, setLangName] = useState<string | null>("");

  const rightSection = langName ? (
    <LoadSampleBooksButton
      langName={langName}
      onSuccess={onSuccess}
      onConfirm={onConfirm}
    />
  ) : (
    <IconSelector size={16} />
  );

  return (
    <Select
      {...props}
      autoFocus={false}
      display="inline-block"
      data={languagePresets}
      allowDeselect={false}
      withCheckIcon={false}
      searchable={true}
      value={langName}
      onChange={setLangName}
      comboboxProps={{ withinPortal: !globalData.hasLanguages }}
      rightSection={rightSection}
      rightSectionPointerEvents={langName === null ? "none" : "all"}
    />
  );
}
