import type { ElementType } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import { DictFavicon } from "./common/DictFavicon";
import type { Dictionary } from "#language/api/types";
import { getLookupURL, handleExternalUrl } from "#helpers/language";

interface DictTabExternal {
  termText: string;
  dict: Dictionary;
  innerRef?: React.ForwardedRef<HTMLElement>;
  component: ElementType;
}

export function DictTabExternal({
  dict,
  termText,
  innerRef,
  component: Component,
}: DictTabExternal) {
  return (
    <Component
      ref={innerRef}
      component="a"
      variant="default"
      fw="normal"
      ml={2}
      leftSection={<DictFavicon hostname={dict.hostname} />}
      rightSection={<IconExternalLink size={16} stroke={1.6} />}
      onClick={() => handleExternalUrl(getLookupURL(dict.url, termText))}>
      {dict.label}
    </Component>
  );
}
