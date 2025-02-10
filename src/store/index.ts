import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { editReducer } from "./animals/edit.reducer";

const rootReducer = combineReducers({
  edit: editReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
