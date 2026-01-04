import {
  useNavigate,
  useRouterState,
  useSearch,
  type ValidateFromPath,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Select, type SelectProps } from "@mantine/core";
import { query } from "#language/api/query";

export function LanguageSelect(props: SelectProps) {
  const { langId } = useSearch({ strict: false });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate({ from: pathname as ValidateFromPath });
  const { data: languages } = useSuspenseQuery(query.list());
  const { onChange, value, ...rest } = props;

  function handleLanguageChange(id: number) {
    navigate({
      search: (prev) => ({
        ...prev,
        langId: langId === id ? undefined : id,
        textDir: languages.find((lang) => lang.id === id)?.textDirection,
        langName: undefined,
      }),
    });
  }

  const languagesSorted = languages.toSorted((a, b) => b.id - a.id);
  const data = languagesSorted.map((language) => ({
    label: language.name,
    value: String(language.id),
  }));

  return (
    <Select
      label="Language"
      value={value ? value : langId ? String(langId) : ""}
      onChange={(id, option) => {
        handleLanguageChange(Number(id));
        onChange?.(id, option);
      }}
      data={data}
      placeholder="Select book language"
      allowDeselect={false}
      {...rest}
    />
  );
}
