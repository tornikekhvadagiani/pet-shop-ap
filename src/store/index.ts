import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animals/animals.slice";
import categoryReducer from "./category/category.slice";
import animalsWithCategoryReducer from "./animalsWithCategory/animalsWithCategory.slice";

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    category: categoryReducer,
    animalsWithCategory: animalsWithCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
