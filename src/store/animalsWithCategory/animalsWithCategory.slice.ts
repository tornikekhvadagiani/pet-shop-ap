import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAnimalsWithCategories,
  deleteAnimalWithCategory,
} from "./animalsWithCategory.thunks";
import { IAnimalsData } from "../../globalTypes";

interface AnimalsState {
  animals: IAnimalsData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AnimalsState = {
  animals: [],
  isLoading: false,
  error: null,
};

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalsWithCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimalsWithCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimalsWithCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteAnimalWithCategory.fulfilled, (state, action) => {
        state.animals = state.animals.filter(
          (animal) => animal._uuid !== action.payload
        );
        console.log("Redux state after delete:", state.animals);
      });
  },
});

export default animalsSlice.reducer;
