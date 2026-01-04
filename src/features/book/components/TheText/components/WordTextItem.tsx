import type { ComponentProps } from "react";
import {
  handleMouseDown,
  handleMouseOver,
  handleMouseOut,
} from "#helpers/interactions-desktop";
import { TermPopup } from "#term/components/TermPopup/TermPopup";
import { TextItem } from "./TextItem";
import type { WordTextitem } from "#book/api/types";

interface WordTextItemProps extends ComponentProps<typeof TextItem> {
  data: WordTextitem;
}

export function WordTextItem({ data, ...props }: WordTextItemProps) {
  const textitem = (
    <TextItem
      {...props}
      data={data}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
  return data.wordId ? (
    <TermPopup id={data.wordId}>{textitem}</TermPopup>
  ) : (
    textitem
  );
}
