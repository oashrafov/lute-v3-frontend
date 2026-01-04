import { Link } from "@tanstack/react-router";
import { Alert, Box, Button, Group, type AlertProps } from "@mantine/core";
import { IconBook2 } from "@tabler/icons-react";
import { SampleBooksSelect } from "#book/components/common/SampleBooksSelect/SampleBooksSelect";
import { Logo } from "#common/Logo";

export function WelcomeAlert(props: AlertProps) {
  return (
    <Alert
      title="Welcome to Lute"
      maw="max-content"
      m="auto"
      styles={{ wrapper: { gap: 10 } }}
      icon={<Logo size={40} />}
      {...props}>
      <Box p={5} maw={600}>
        <Group wrap="nowrap" mb={10} justify="space-between">
          <span>
            To get started using <strong>Lute</strong> load a short story in
          </span>{" "}
          <SampleBooksSelect placeholder="Predefined language" w={200} />
        </Group>

        <Group wrap="nowrap" justify="center">
          <span>or</span>
          <Button
            leftSection={<IconBook2 />}
            renderRoot={(props) => <Link to="/create-book" {...props} />}>
            Create a New Book
          </Button>
          <span>with your language</span>
        </Group>
      </Box>
    </Alert>
  );
}
