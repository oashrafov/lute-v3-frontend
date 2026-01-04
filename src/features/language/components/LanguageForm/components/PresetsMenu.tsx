import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Button,
  Menu,
  ScrollAreaAutosize,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { query } from "#language/api/query";

export function PresetsMenu() {
  const { data: presets } = useSuspenseQuery(query.presetsList());
  const [filter, setFilter] = useState("");
  const presetsFiltered = presets.filter((preset) =>
    preset.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Menu width={180}>
      <Menu.Target>
        <Button
          px={0}
          variant="transparent"
          rightSection={<IconChevronDown size={18} stroke={2} />}>
          Apply preset
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Preset name"
          mb={5}
        />
        <ScrollAreaAutosize mah={220}>
          {presetsFiltered.map((language) => (
            <Menu.Item
              key={language}
              renderRoot={(props) => (
                <Link
                  search={(prev) => ({
                    ...prev,
                    langId: undefined,
                    langName: language,
                  })}
                  {...props}
                />
              )}>
              <Text fz={13}>{language}</Text>
            </Menu.Item>
          ))}
        </ScrollAreaAutosize>
      </Menu.Dropdown>
    </Menu>
  );
}
