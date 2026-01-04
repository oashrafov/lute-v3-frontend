import { Box, SegmentedControl } from "@mantine/core";
import {
  IconCircleLetterAFilled,
  IconDeviceDesktop,
  IconDeviceMobile,
} from "@tabler/icons-react";
import classes from "../DrawerMenu.module.css";

export function DrawerFooter() {
  return (
    <Box className={classes.footer}>
      <SegmentedControl
        fullWidth
        styles={{
          label: { padding: "0.2rem" },
          innerLabel: { lineHeight: 0, display: "block" },
        }}
        size="xs"
        withItemsBorders
        color="blue"
        data={[
          {
            value: "desktop",
            label: <IconDeviceDesktop />,
          },
          { value: "mobile", label: <IconDeviceMobile /> },
          {
            value: "auto",
            label: <IconCircleLetterAFilled />,
          },
        ]}
      />
    </Box>
  );
}
