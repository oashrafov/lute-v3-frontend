import { Link } from "@tanstack/react-router";
import type { SentenceReferenceData } from "#term/api/types";
import { SentenceReferenceHoverCard } from "../SentenceReferenceHoverCard/SentenceReferenceHoverCard";
import classes from "./SentenceReference.module.css";

interface SentenceReference {
  data: SentenceReferenceData;
}

export function SentenceReference({ data }: SentenceReference) {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: data.sentence }} />
      <SentenceReferenceHoverCard referenceData={data}>
        <Link
          preload={false}
          to="/books/$bookId/pages/$pageNum"
          params={{ bookId: data.bookId, pageNum: data.pageNumber }}
          target="_blank"
          className={classes.bookLink}>
          {data.bookTitle}
        </Link>
      </SentenceReferenceHoverCard>
    </>
  );
}
