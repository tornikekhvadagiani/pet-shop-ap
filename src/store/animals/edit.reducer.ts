import { editItem } from "../types";

const initialState: editItem | null = null;

type Action = {
  type: "EDIT_ITEMS";
  payload: editItem;
};

export const editReducer = (
  state = initialState,
  action: Action
): editItem | null => {
  switch (action.type) {
    case "EDIT_ITEMS":
      return { ...action.payload };
    default:
      return state;
  }
};
