import { editItem } from "../types";

export const editAction = (payload: editItem | null) => ({
  type: "EDIT_ITEMS",
  payload,
});
