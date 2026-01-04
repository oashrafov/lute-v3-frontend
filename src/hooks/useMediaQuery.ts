import { em } from "@mantine/core";
import { useMediaQuery as umq } from "@mantine/hooks";

export function useMediaQuery() {
  const isMobile = umq(`(max-width: ${em(576)})`);
  const isTablet = umq(`(max-width: ${em(992)})`);
  const isDesktop = umq(`(min-width: ${em(992)})`);

  return isMobile ? "mobile" : isTablet ? "tablet" : isDesktop && "desktop";
}
