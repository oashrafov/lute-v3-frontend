import { Modal, rem, type ModalProps } from "@mantine/core";
import { EditBookForm } from "#book/components/EditBookForm/EditBookForm";
import type { BooksListItem } from "#book/api/types";

interface EditBookModal extends ModalProps {
  book: BooksListItem | null;
  onClose: () => void;
}

export function EditBookModal({ book, onClose, ...props }: EditBookModal) {
  return (
    <Modal
      {...props}
      title="Edit book"
      onClose={onClose}
      styles={{ title: { fontSize: rem(18), fontWeight: 600 } }}
      hidden={!book}>
      {book && (
        <EditBookForm
          book={{ ...book, audioFile: null }}
          textDirection={book.textDirection}
          onAction={onClose}
        />
      )}
    </Modal>
  );
}
