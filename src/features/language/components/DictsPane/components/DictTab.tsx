import { Button, Tabs, Tooltip } from "@mantine/core";
import { DictTabExternal } from "./DictTabExternal";
import { DictTabEmbedded } from "./DictTabEmbedded";
import type { Dictionary } from "#language/api/types";

interface DictTab {
  dict: Dictionary;
  value: string;
  termText: string;
}

export function DictTab({ dict, value, termText }: DictTab) {
  return (
    <Tooltip label={dict.label} openDelay={150} refProp="innerRef">
      {dict.type === "popup" ? (
        <DictTabExternal dict={dict} termText={termText} component={Button} />
      ) : (
        <DictTabEmbedded dict={dict} value={value} component={Tabs.Tab} />
      )}
    </Tooltip>
  );
}
