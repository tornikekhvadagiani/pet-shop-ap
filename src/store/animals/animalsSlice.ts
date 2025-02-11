import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAnimalsData } from "../../globalTypes";
import { toast } from "react-toastify";

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

// Fetch Animals Thunk
export const fetchAnimals = createAsyncThunk<
  IAnimalsData[],
  { url: string; key: string },
  { rejectValue: string }
>("animals/fetchAnimals", async ({ url, key }, { rejectWithValue }) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.items; // Assuming API response has `items` array
  } catch (error: any) {
    toast.error("Something Went Wrong!");
    return rejectWithValue(error.message);
  }
});

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch animals.";
      });
  },
});

export default animalsSlice.reducer;
