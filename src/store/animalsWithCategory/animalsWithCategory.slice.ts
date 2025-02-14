import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAnimalsWithCategories,
  deleteAnimalWithCategory,
} from "./animalsWithCategory.thunks";
import { IAnimalsData } from "../../globalTypes";

interface AnimalsWithCategoryState {
  animalsWithCategory: IAnimalsData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AnimalsWithCategoryState = {
  animalsWithCategory: [],
  isLoading: false,
  error: null,
};

const animalsWithCategorySlice = createSlice({
  name: "animalsWithCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalsWithCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimalsWithCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animalsWithCategory = action.payload;
      })
      .addCase(fetchAnimalsWithCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAnimalWithCategory.fulfilled, (state, action) => {
        state.animalsWithCategory = state.animalsWithCategory.filter(
          (item) => item._uuid !== action.payload
        )
      })
  },
});

export default animalsWithCategorySlice.reducer;
