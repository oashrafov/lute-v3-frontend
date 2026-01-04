import { useState } from "react";
import { useController, type Control } from "react-hook-form";
import { InputClearButton, Loader } from "@mantine/core";
import { IconSitemap } from "@tabler/icons-react";
import { MAX_TERM_SUGGESTIONS } from "#resources/constants";
import { TagsField } from "#common/TagsField/TagsField";
import { useParentTagsFieldOptionsQuery } from "./useParentTagsFieldOptionsQuery";
import type { TermForm } from "#term/api/types";
import classes from "../../TermForm.module.css";

interface ParentTagsField {
  control: Control<TermForm>;
  termText: string;
  onOptionSubmit: (parent: string) => void;
  onTagClick?: (item: string) => void;
  languageId?: number;
}

export function ParentTagsField({
  termText,
  onTagClick,
  onOptionSubmit,
  control,
  languageId,
}: ParentTagsField) {
  const { field } = useController({ name: "parents", control });
  const [search, setSearch] = useState("");
  const { value, onChange } = field;

  const { data, isFetching } = useParentTagsFieldOptionsQuery(
    search,
    termText,
    value,
    languageId
  );

  const inputRightSection =
    value.length > 0 ? (
      <InputClearButton onClick={() => onChange([])} />
    ) : (
      isFetching && <Loader size="sm" />
    );

  return (
    <TagsField
      data={data}
      searchValue={search}
      onSearchChange={setSearch}
      rightSection={inputRightSection}
      value={value}
      onChange={onChange}
      onTagClick={onTagClick}
      onOptionSubmit={onOptionSubmit}
      limit={MAX_TERM_SUGGESTIONS}
      leftSection={<IconSitemap size={20} />}
      leftSectionProps={{ className: classes.leftSection }}
      placeholder="Parents"
      maxDropdownHeight={250}
      mb={5}
    />
  );
}
