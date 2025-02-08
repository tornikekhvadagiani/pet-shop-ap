import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { petsReducer } from "./pets/pets.reducer.ts";

const rootReducer = combineReducers({
  petsList: petsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
