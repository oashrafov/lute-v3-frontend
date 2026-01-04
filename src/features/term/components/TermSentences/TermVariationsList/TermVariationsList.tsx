import type { TermInflection } from "#term/api/types";
import { TermVariationItem } from "../TermVariationItem/TermVariationItem";
import classes from "./TermVariationsList.module.css";

interface TermVariationsList {
  data: TermInflection[];
}

export function TermVariationsList({ data }: TermVariationsList) {
  return (
    <ul className={classes.list}>
      {data.map(
        ({ inflection: term, references }) =>
          references.length > 0 && (
            <li key={term}>
              <TermVariationItem term={term} references={references} />
            </li>
          )
      )}
    </ul>
  );
}
