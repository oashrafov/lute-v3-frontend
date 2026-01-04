import { z } from "zod";
import { StatusSchema, TextDirectionSchema } from "#resources/schemas";

const BookIdSchema = z.int().positive();

export const BookmarksSchema = z.array(
  z.object({
    page: z.int().positive(),
    sentences: z.array(
      z.object({
        id: z.int().nonnegative(),
        description: z.string(),
      })
    ),
  })
);

export const AudioSchema = z.object({
  id: BookIdSchema,
  name: z.string().nonempty(),
  position: z.float32().positive(),
  bookmarks: z.array(z.float32().positive()),
});

const BookSchema = z.object({
  id: BookIdSchema,
  languageId: z.int().positive("A language must be selected"),
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(255, "Title cannot be longer than 255 characters"),
  source: z.url().max(1000).nullable(),
  tags: z.array(z.string()),
  audio: AudioSchema.nullable(),
  audioName: AudioSchema.shape.name.nullable(),
  textDirection: TextDirectionSchema,
  pageCount: z.int().positive(),
  currentPage: z.int().positive(),
  wordCount: z.int().positive(),
  unknownPercent: z.float32().nullable(),
  lastRead: z.string().nullable(),
  languageName: z.string().nonempty(),
  isCompleted: z.boolean(),
  isArchived: z.boolean(),
  bookmarks: BookmarksSchema.nullable(),
});

const BookDataBaseSchema = BookSchema.pick({
  id: true,
  languageId: true,
  currentPage: true,
  pageCount: true,
  source: true,
  title: true,
  textDirection: true,
});

export const BookDetailSchema = BookDataBaseSchema.extend(
  BookSchema.pick({
    audio: true,
    bookmarks: true,
  }).shape
);

export const BooksListItemSchema = BookDataBaseSchema.extend(
  BookSchema.pick({
    audioName: true,
    isArchived: true,
    isCompleted: true,
    languageName: true,
    lastRead: true,
    tags: true,
    unknownPercent: true,
    wordCount: true,
  }).shape
);

const WordTextitemBaseSchema = z.object({
  wordId: z.int().nullable(), // non processed words won't have id initially
  status: StatusSchema,
  languageId: z.int().positive(),
});

const TextitemBaseSchema = z.object({
  id: z.string(),
  displayText: z.string(),
  paragraphId: z.int().nonnegative(),
  sentenceId: z.int().nonnegative(),
  text: z.string(),
  order: z.int(),
  isSentenceStart: z.boolean(),
  isSentenceEnd: z.boolean(),
  isOverlapped: z.boolean(),
});

export const BookStatsSchema = z.array(
  z.object({
    status: StatusSchema.refine((val) => val !== 98),
    percentage: z.float32(),
    wordCount: z.int(),
  })
);

export const WordTextitemSchema = z.object({
  isWord: z.literal(true),
  ...TextitemBaseSchema.shape,
  ...WordTextitemBaseSchema.shape,
});

export const TextitemSchema = z.discriminatedUnion("isWord", [
  TextitemBaseSchema.extend({
    isWord: z.literal(false),
    wordId: z.literal(null),
    languageId: z.literal(null),
    status: z.literal(null),
  }),
  WordTextitemSchema,
]);

export const ParagraphSchema = z.array(z.array(TextitemSchema));

export const PageSchema = z.object({
  text: z.string().nonempty(),
  paragraphs: z.array(ParagraphSchema),
});

export const CreateBookFormDefaultsSchema = z.object({
  title: z.string(),
  text: z.string(),
  importUrl: z.string(),
  source: z.string(),
  languageId: z.null(),
  tags: z.array(z.string()),
  wordsPerPage: z.int(),
  splitBy: z.enum(["paragraphs", "sentences"]),
  textFile: z.null(),
  audioFile: z.null(),
});

export const BooksListResponseSchema = z.object({
  data: z.array(BooksListItemSchema),
  activeCount: z.int().nonnegative(),
  archivedCount: z.int().nonnegative(),
  filteredCount: z.int().nonnegative(),
  totalCount: z.int().nonnegative(),
});

export const CreateBookResponseSchema = BookSchema.pick({
  id: true,
  title: true,
  languageId: true,
});

export const EditBookResponseSchema = BookSchema.pick({
  id: true,
  title: true,
}).extend({ archivedCount: z.int().nonnegative().optional() });

export const DeleteBookResponseSchema = BookSchema.pick({
  title: true,
});

export const GenerateContentFromURLResponseSchema = BookSchema.pick({
  title: true,
  text: true,
  source: true,
});

export const ProcessPageResponseSchema = BookSchema.pick({
  id: true,
});

export const CreateBookFormSchema = BookSchema.pick({
  title: true,
  source: true,
  tags: true,
}).extend({
  languageId: BookSchema.shape.languageId.nullable().transform((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: "custom",
        message: "A language must be selected",
      });
      return z.NEVER;
    }
    return val;
  }),
  text: z.string().min(1, "Text content must be at least 1 character long"),
  importUrl: z.url().or(z.literal("")),
  textFile: z
    .file()
    .mime(
      [
        "application/pdf",
        "text/plain",
        "application/epub+zip",
        "application/x-subrip",
        "text/vtt",
      ],
      "Valid file formats are: txt, epub, pdf, srt, vtt"
    )
    .nullable(),
  audioFile: z
    .file()
    .mime(
      [
        "audio/mpeg",
        "audio/mp4",
        "audio/wav",
        "audio/ogg",
        "audio/opus",
        "audio/aac",
        "audio/flac",
        "audio/webm",
      ],
      "Valid file formats are: mp3, m4a, wav, ogg, opus, aac, flac, webm"
    )
    .nullable(),
  wordsPerPage: z
    .int()
    .min(1, "There has to be at least 1 word per page")
    .max(1500, "Can't add more than 1500 words per page"),
  splitBy: z.enum(["paragraphs", "sentences"]),
});

export const EditBookFormSchema = BookSchema.pick({
  id: true,
  title: true,
  source: true,
  tags: true,
  audioName: true,
}).extend({ audioFile: CreateBookFormSchema.shape.audioFile });

export const GenerateContentFromFileResponseSchema = CreateBookFormSchema.pick({
  text: true,
});
