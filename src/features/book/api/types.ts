import { z } from "zod";
import {
  AudioSchema,
  BookDetailSchema,
  BooksListItemSchema,
  BookmarksSchema,
  CreateBookResponseSchema,
  DeleteBookResponseSchema,
  EditBookResponseSchema,
  GenerateContentFromFileResponseSchema,
  GenerateContentFromURLResponseSchema,
  ProcessPageResponseSchema,
  TextitemSchema,
  PageSchema,
  ParagraphSchema,
  CreateBookFormSchema,
  EditBookFormSchema,
  WordTextitemSchema,
} from "./schemas";

export interface EditAction {
  action:
    | "active"
    | "archive"
    | "unarchive"
    | "edit"
    | "updateAudioData"
    | "markPageAsRead";
  [key: string]: unknown;
}

export type EditBookForm = z.infer<typeof EditBookFormSchema>;
export type Audio = z.infer<typeof AudioSchema>;
export type BooksListItem = z.infer<typeof BooksListItemSchema>;
export type Bookmarks = z.infer<typeof BookmarksSchema>;
export type Textitem = z.infer<typeof TextitemSchema>;
export type WordTextitem = z.infer<typeof WordTextitemSchema>;
export type Paragraph = z.infer<typeof ParagraphSchema>;

export type Page = z.infer<typeof PageSchema>;
export type BookDetail = z.infer<typeof BookDetailSchema>;
export type CreateBookForm = z.infer<typeof CreateBookFormSchema>;
export type CreateBookResponse = z.infer<typeof CreateBookResponseSchema>;
export type EditBookResponse = z.infer<typeof EditBookResponseSchema>;
export type DeleteBookResponse = z.infer<typeof DeleteBookResponseSchema>;
export type GenerateContentFromURLResponse = z.infer<
  typeof GenerateContentFromURLResponseSchema
>;
export type GenerateContentFromFileResponse = z.infer<
  typeof GenerateContentFromFileResponseSchema
>;
export type ProcessPageResponse = z.infer<typeof ProcessPageResponseSchema>;
