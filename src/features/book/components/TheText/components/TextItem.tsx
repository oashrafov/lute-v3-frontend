import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { Textitem } from "#book/api/types";
import { DEFAULT_HIGHLIGHT_TYPE, TEXTITEM_CLASS } from "#resources/constants";

export const TextItem = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span"> & { data: Textitem }
>(function TextItem(props, ref) {
  const { data, id, className, ...restProps } = props;

  const classes =
    "textitem" +
    (data.isWord ? ` ${TEXTITEM_CLASS.word}` : "") +
    (data.isOverlapped ? ` ${TEXTITEM_CLASS.overlapped}` : "") +
    (className ? ` ${className}` : "");

  return (
    <span
      ref={ref}
      id={String(data.id)}
      className={classes}
      data-lang-id={data.languageId}
      data-paragraph-id={data.paragraphId}
      data-sentence-id={data.sentenceId}
      data-sentence-start={data.isSentenceStart}
      data-sentence-end={data.isSentenceEnd}
      data-highlight-type={
        data.status !== null && DEFAULT_HIGHLIGHT_TYPE[data.status]
      }
      data-text={data.text}
      data-status={data.status}
      data-order={data.order}
      data-word-id={data.wordId}
      {...restProps}>
      {data.displayText}
    </span>
  );
});
