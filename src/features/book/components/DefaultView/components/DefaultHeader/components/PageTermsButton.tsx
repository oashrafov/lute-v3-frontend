import { getRouteApi } from "@tanstack/react-router";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBracketsContain } from "@tabler/icons-react";
import { getWords } from "#helpers/text";

const route = getRouteApi("/books/$bookId/pages/$pageNum/");

export function PageTermsButton() {
  const navigate = route.useNavigate();

  async function handleOpenTermsTable() {
    const termIds = getWords().map((word) => Number(word.dataset.wordId));
    navigate({ search: (prev) => ({ ...prev, termIds: termIds }) });
  }

  return (
    <Tooltip label="Open table with current page terms">
      <ActionIcon size="sm" variant="subtle" onClick={handleOpenTermsTable}>
        <IconBracketsContain />
      </ActionIcon>
    </Tooltip>
  );
}
