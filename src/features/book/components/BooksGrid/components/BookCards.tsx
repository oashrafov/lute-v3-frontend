import { BookCard } from "./BookCard";
import type { BooksListItem } from "#book/api/types";

interface BookCards {
  books: BooksListItem[];
  onEditSuccess: () => void;
}

export function BookCards({ books, onEditSuccess }: BookCards) {
  return books.map((book) => (
    <BookCard key={book.title} book={book} onEditSuccess={onEditSuccess} />
  ));
}
