import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnimalsData } from "../../globalTypes";

export const fetchAnimals = createAsyncThunk<
  IAnimalsData[],
  { url: string; key: string },
  { rejectValue: string }
>("animals/fetchAnimals", async ({ url, key }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/animals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong!");
  }
});

export const deleteAnimal = createAsyncThunk<
  string,
  { id: string; key: string; url: string },
  { rejectValue: string }
>("animals/deleteAnimal", async ({ id, key, url }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/animals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong!");
  }
});
