import { TextItem } from "#book/components/TheText/components/TextItem";
import type { Paragraph } from "#book/api/types";
import type { TextDirection } from "#resources/types";
import { TEXTITEM_DATASET } from "#resources/constants";
import classes from "./SentenceTextPreview.module.css";

interface SentenceTextPreview {
  paragraphs: Paragraph[];
  sentenceId: number;
  textDir: TextDirection;
}

export function SentenceTextPreview({
  paragraphs,
  sentenceId,
  textDir,
}: SentenceTextPreview) {
  return (
    <div
      style={{ whiteSpace: "break-spaces" }}
      dir={textDir}
      ref={(element) => {
        if (element) {
          // append classname, so content on the page doesn't get selected
          const textitem = document.querySelector(
            `[data-${TEXTITEM_DATASET.sentenceId}="${sentenceId}"].${classes.textitem}`
          );
          textitem?.scrollIntoView({ behavior: "smooth" });
        }
      }}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.map((sentence, index) => (
            <span key={index}>
              {sentence.map((textitem) => (
                <TextItem
                  data={textitem}
                  key={textitem.id}
                  data-highlight-type="none"
                  className={
                    textitem.sentenceId === sentenceId
                      ? `${classes.textitem} ${classes.sentence}`
                      : classes.textitem
                  }
                />
              ))}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
