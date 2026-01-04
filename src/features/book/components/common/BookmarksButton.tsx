import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { IconBookmarksFilled } from "@tabler/icons-react";
import { PageActionButton } from "./PageActionButton";

export const BookmarksButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(function BookmarksButton(props, ref) {
  return <PageActionButton ref={ref} icon={IconBookmarksFilled} {...props} />;
});
