import { ActionIcon, Paper, Popover, rem } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export function MeCabInfo() {
  return (
    <Popover position="top" withArrow shadow="sm">
      <Popover.Target>
        <ActionIcon variant="transparent">
          <IconQuestionMark />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Paper maw={500} fz="sm">
          <p style={{ marginBottom: rem(5) }}>
            Lute uses MeCab to parse Japanese, so MeCab needs to be installed on
            your machine (see notes in{" "}
            <a
              href="https://luteorg.github.io/lute-manual/install/mecab.html"
              target="_blank">
              the manual
            </a>
            ).
          </p>
          <p style={{ marginBottom: rem(5) }}>
            Lute includes the Python library{" "}
            <a href="https://github.com/buruzaemon/natto-py">natto-py</a> to
            interact with MeCab. natto-py can usually find MeCab automatically,
            but you <em>may</em> need to set the MECAB_PATH, per{" "}
            <a
              href="https://luteorg.github.io/lute-manual/install/mecab.html#lute-configuration"
              target="_blank">
              the manual
            </a>
            .
          </p>
          <p>
            Try different values for MECAB_PATH, including leaving the field
            blank, until clicking the &quot;Test&quot; button returns a
            &quot;success&quot; message.
          </p>
        </Paper>
      </Popover.Dropdown>
    </Popover>
  );
}
