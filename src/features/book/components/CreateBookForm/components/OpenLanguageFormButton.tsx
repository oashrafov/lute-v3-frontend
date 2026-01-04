import { useNavigate } from "@tanstack/react-router";
import {
  ActionIcon,
  type ActionIconProps,
  type ElementProps,
} from "@mantine/core";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

interface OpenLanguageFormButton
  extends ActionIconProps,
    ElementProps<"button", keyof ActionIconProps> {}

export function OpenLanguageFormButton(props: OpenLanguageFormButton) {
  const navigate = useNavigate({ from: "/create-book" });
  return (
    <ActionIcon
      variant="transparent"
      color="green.6"
      onClick={() =>
        navigate({ search: (prev) => ({ ...prev, langForm: true }) })
      }
      {...props}>
      <IconSquareRoundedPlusFilled />
    </ActionIcon>
  );
}
