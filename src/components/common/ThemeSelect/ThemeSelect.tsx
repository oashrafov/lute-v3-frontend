import { useState } from "react";
import { Select, type SelectProps } from "@mantine/core";
import { IconPalette } from "@tabler/icons-react";
// TODO - create context
export function ThemeSelect(props: SelectProps) {
  const userThemes = ["LWT_dark", "Lute_light", "Night_dark"] as const; // mock
  const themes = ["Light_light", "Dark_dark", ...userThemes] as const;
  type Theme = (typeof themes)[number];

  const [theme, setTheme] = useState<Theme>("Light_light");

  function handleToggleScheme(theme: Theme) {
    const [name, scheme] = theme.split("_");
    document.documentElement.dataset.theme = name.toLowerCase();
    document.documentElement.dataset.scheme = scheme;
    document.documentElement.dataset.mantineColorScheme = scheme;

    setTheme(theme);
  }

  const selectData = themes.map((theme) => ({
    label: theme.split("_")[0],
    value: theme,
  }));

  return (
    <Select
      size="xs"
      w={120}
      value={theme}
      onChange={(val) => handleToggleScheme(val as Theme)}
      allowDeselect={false}
      data={selectData}
      leftSection={<IconPalette size={16} />}
      {...props}
    />
  );
}
