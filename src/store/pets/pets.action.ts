import { Pet } from "../types";

export const addPetsAction = (payload: Pet) => ({
  type: "ADD_PET",
  payload,
});

export const deletePetsAction = (payload: Pet) => ({
  type: "DELETE_PET",
  payload,
});
