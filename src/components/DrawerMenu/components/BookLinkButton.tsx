import { Link } from "@tanstack/react-router";
import {
  Button,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
  type ButtonProps,
  type ElementProps,
} from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";

interface BookLinkButton
  extends ButtonProps,
    ElementProps<"button", keyof ButtonProps> {
  bookId: number;
  pageNum: number;
  tooltip: string;
  isBookCompleted: boolean;
}

export function BookLinkButton({
  bookId,
  pageNum,
  tooltip,
  isBookCompleted,
  children,
  ...rest
}: BookLinkButton) {
  return (
    <Tooltip label={tooltip} openDelay={200}>
      <Button
        mb={2}
        fullWidth
        variant="subtle"
        size="compact-sm"
        styles={{ inner: { justifyContent: "flex-start" } }}
        style={{ textDecoration: "none", color: "inherit" }}
        renderRoot={(props) => (
          <Link
            to="/books/$bookId/pages/$pageNum"
            params={{ bookId: bookId, pageNum: pageNum }}
            {...props}
          />
        )}
        {...rest}>
        <Group wrap="nowrap" gap={5}>
          <ThemeIcon
            size="sm"
            color={isBookCompleted ? "green.6" : "dark.1"}
            variant="transparent">
            <IconCircleCheckFilled />
          </ThemeIcon>
          <Text fz="sm" lineClamp={1} truncate>
            {children}
          </Text>
        </Group>
      </Button>
    </Tooltip>
  );
}
