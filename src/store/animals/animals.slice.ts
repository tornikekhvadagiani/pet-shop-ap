import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAnimals, deleteAnimal } from "./animals.thunks";
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
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error deleting animal.";
      });
  },
});

export default animalsSlice.reducer;
