import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animals/animals.slice";
import categoryReducer from "./category/category.slice"; // Import the category reducer

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
