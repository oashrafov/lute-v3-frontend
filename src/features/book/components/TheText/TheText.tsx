import { Fragment, memo, type MouseEvent } from "react";
import { TextItem } from "./components/TextItem";
import { WordTextItem } from "./components/WordTextItem";
import type { Paragraph } from "#book/api/types";
import type { WordElement } from "#resources/types";

interface TheText {
  paragraphs: Paragraph[];
  onSelectEnd: (e: MouseEvent<WordElement>) => Promise<void>;
}

export const TheText = memo(function TheText({
  paragraphs,
  onSelectEnd,
}: TheText) {
  return (
    <div className="thetext">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="textparagraph">
          {paragraph.map((sentence, index) => (
            <span key={index}>
              {sentence.map((textitem) => (
                <Fragment key={textitem.id}>
                  {textitem.isWord ? (
                    <WordTextItem data={textitem} onMouseUp={onSelectEnd} />
                  ) : (
                    <TextItem data={textitem} />
                  )}
                </Fragment>
              ))}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
});
