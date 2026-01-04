import type { ReactNode } from "react";
import { Box, type BoxProps } from "@mantine/core";
import classes from "./PageContainer.module.css";

interface PageContainer extends BoxProps {
  children: ReactNode;
}

export function PageContainer({ children, ...props }: PageContainer) {
  return (
    <Box className={classes.container} w="100%" {...props}>
      {children}
    </Box>
  );
}
