import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAnimals, deleteAnimal } from "./animals.thunks";
import { IAnimalsData } from "../../globalTypes";
import { fetchAnimalsWithCategories } from "../animalsWithCategory/animalsWithCategory.thunks";

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

      .addCase(fetchAnimals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAnimals.fulfilled,
        (state, action: PayloadAction<IAnimalsData[]>) => {
          state.isLoading = false;
          state.animals = action.payload;
        }
      )
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching animals.";
      })

      .addCase(deleteAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteAnimal.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.animals = state.animals.filter(
            (animal) => animal._uuid !== action.payload
          );
        }
      )
      .addCase(deleteAnimal.rejected, (state) => {
        state.isLoading = false;
      })
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
      });
  },
});

export default animalsSlice.reducer;
