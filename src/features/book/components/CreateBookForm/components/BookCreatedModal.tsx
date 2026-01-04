import { Link } from "@tanstack/react-router";
import { Button, Group, Modal, Stack, type ModalProps } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { CreateBookResponse } from "#book/api/types";

interface BookCreatedModal extends ModalProps {
  book?: CreateBookResponse;
}

export function BookCreatedModal({ book, ...props }: BookCreatedModal) {
  return (
    <Modal title="Book created" {...props}>
      <Stack>
        <Group justify="center">
          <Button variant="default" onClick={props.onClose}>
            Create another
          </Button>
          <Button
            color="green"
            rightSection={<IconArrowRight />}
            renderRoot={(props) => (
              <Link
                to="/books/$bookId/pages/$pageNum"
                params={{ bookId: book?.id, pageNum: 1 }}
                {...props}
              />
            )}>
            Go to book
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
