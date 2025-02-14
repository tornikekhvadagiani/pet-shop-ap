import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, deleteCategory } from "./category.thunks";
import { ICategoryData } from "../../globalTypes";

interface CategoryState {
  categories: ICategoryData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._uuid !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
