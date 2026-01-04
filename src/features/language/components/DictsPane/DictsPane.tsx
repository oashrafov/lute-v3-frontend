import { useState } from "react";
import { Tabs } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { MAX_VISIBLE_DICT_TABS } from "#resources/constants";
import { getLookupURL } from "#helpers/language";
import { DictsMenu } from "./components/DictsMenu";
import { VisibleDictsContainer } from "./components/VisibleDictsContainer";
import { DictsTabs } from "./components/DictsTabs";
import { IFramePanel } from "./components/IFramePanel";
import { DictTab } from "./components/DictTab";
import { Tab } from "./components/Tab";
import type { Dictionary } from "#language/api/types";
import classes from "./DictsPane.module.css";

interface DictsPane {
  termText: string;
  dictionaries: Dictionary[];
  onReturnFocusToForm?: () => void;
}

const tabValues = {
  dropdown: "dropdownTab",
  images: "imagesTab",
};

export function DictsPane({
  termText,
  dictionaries,
  onReturnFocusToForm,
}: DictsPane) {
  const [activeDropdownUrl, setActiveDropdownUrl] = useState("");
  const visibleDicts = dictionaries.slice(0, MAX_VISIBLE_DICT_TABS);
  const dropdownDicts = dictionaries.slice(MAX_VISIBLE_DICT_TABS);
  const embeddedVisibleDicts = visibleDicts.filter(
    (dict) => dict.type === "embedded"
  );

  return (
    <DictsTabs defaultValue={String(visibleDicts[0].id)}>
      <Tabs.List className={`${classes.flex} ${classes.tabList}`}>
        <VisibleDictsContainer>
          {visibleDicts.map((dict) => (
            <DictTab
              key={dict.label}
              dict={dict}
              value={String(dict.id)}
              termText={termText}
            />
          ))}
        </VisibleDictsContainer>

        {dropdownDicts.length > 0 && (
          <DictsMenu
            termText={termText}
            dicts={dropdownDicts}
            onClick={setActiveDropdownUrl}
            tabValue={tabValues.dropdown}
          />
        )}

        <Tab value={tabValues.images} leftSection={<IconPhoto />} />
      </Tabs.List>

      {embeddedVisibleDicts.map((dict) => (
        <IFramePanel
          key={dict.label}
          frameSrc={getLookupURL(dict.url, termText)}
          value={String(dict.id)}
          onFrameLoad={onReturnFocusToForm} // !fix: calling this causes loss of dict scroll position
        />
      ))}

      <IFramePanel
        frameSrc={getLookupURL(activeDropdownUrl, termText)}
        onFrameLoad={onReturnFocusToForm}
        value={tabValues.dropdown}
      />

      <IFramePanel frameSrc="" value={tabValues.images} />
    </DictsTabs>
  );
}
