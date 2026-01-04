import { Tooltip } from "@mantine/core";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { PageActionButton } from "../PageActionButton";
import { useMarkPageAsRead } from "#book/hooks/useMarkPageAsRead";

export function MarkRestAsKnownButton() {
  const markPageAsRead = useMarkPageAsRead();

  function handleClick() {
    markPageAsRead(true);
  }

  return (
    <Tooltip label="Mark rest as known" position="right">
      <PageActionButton
        onClick={handleClick}
        icon={IconRosetteDiscountCheckFilled}
        color="green.6"
      />
    </Tooltip>
  );
}
