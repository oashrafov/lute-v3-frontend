import type { Status, TextitemElement } from "#resources/types";
import type { TermForm } from "#term/api/types";
import { clamp } from "#utils/utils";
import { getHovered, getMarked } from "./text";

function _getTextitemsStatusData(textitems: TextitemElement[]) {
  type Data = Record<string, number[]>;

  const statuses = ["0", "1", "2", "3", "4", "5", "99"];
  const data: Data = Object.fromEntries(statuses.map((status) => [status, []]));

  textitems.forEach((textitem) => {
    const status = textitem.dataset.status;
    if (status !== undefined && statuses.includes(status)) {
      const wordId = Number(textitem.dataset.wordId);
      data[status].push(wordId);
    }
  });

  return data;
}

function _getShiftedStatusData(
  initialData: Record<string, number[]>,
  shiftBy: number
) {
  const statusArray = Object.keys(initialData);
  const result: Record<string, number[]> = {};

  Object.entries(initialData).forEach(([status, termIds]) => {
    const statusIndex = statusArray.indexOf(status);
    const updatedIndex = clamp(statusIndex + shiftBy, 0, 6);
    const updatedStatus = Number(statusArray[updatedIndex]);
    // Can't set status to 0 (that is for deleted/non-existent terms only).
    // TODO delete term from reading screen: setting to 0 could equal deleting term.
    if (updatedIndex !== statusIndex && updatedStatus !== 0) {
      result[updatedStatus] = termIds;
    }
  });

  return result;
}

export function shiftStatusForSelected(
  shiftBy: number
): Pick<TermForm, "id" | "status">[] | undefined {
  const textitems = getMarked().concat(getHovered());
  if (!textitems.length) return;

  const initial = _getTextitemsStatusData(textitems);
  const updated = _getShiftedStatusData(initial, shiftBy);

  const res = Object.entries(updated).flatMap(([status, termIds]) =>
    termIds.map((id) => ({ id, status: Number(status) as Status }))
  );

  return res;
}

export function setStatusForSelected(
  status: Status
): Pick<TermForm, "id" | "status">[] | undefined {
  const termIds = getMarked()
    .concat(getHovered())
    .map((textitem) => Number(textitem.dataset.wordId));

  if (!termIds.length) return;

  const res = termIds.map((id) => ({
    id,
    status,
  })) as Pick<TermForm, "id" | "status">[];

  return res;
}
