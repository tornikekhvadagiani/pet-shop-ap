import { Pet, PetsState } from "../types";

const initialState: PetsState = {
  petsList: [],
};

type AddPetsAction = { type: "ADD_PET"; payload: Pet };
type DeletePetsAction = { type: "DELETE_PET"; payload: Pet };
type PetsAction = AddPetsAction | DeletePetsAction;

export const petsReducer = (
  state = initialState,
  action: PetsAction
): PetsState => {
  switch (action.type) {
    case "ADD_PET":
      return { ...state, petsList: [...state.petsList, action.payload] };

    case "DELETE_PET":
      return {
        ...state,
        petsList: state.petsList.filter(
          (pet) => pet.name !== action.payload.name
        ),
      };

    default:
      return state;
  }
};
