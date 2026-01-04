import { useEffect } from "react";
import { getPressedKeysAsString } from "#utils/utils";
import { useShortcutCallbackMapping } from "./useShortcutCallbackMapping";

export function useSetupShortcuts() {
  const callbackMapping = useShortcutCallbackMapping();

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea") && e.key !== "Escape") return;

      const key = getPressedKeysAsString(e);
      if (key in callbackMapping) {
        e.preventDefault();
        callbackMapping[key]();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [callbackMapping]);
}
