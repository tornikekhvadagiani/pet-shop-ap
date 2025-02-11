import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IAnimalsData, IAnimalsMainData } from "../../globalTypes";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_ANIMALS_KEY;

// Fetch a single animal by ID
export const fetchAnimalById = createAsyncThunk(
  "animals/fetchAnimalById",
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/animals/${uuid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch animal data");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Add a new animal
export const addAnimal = createAsyncThunk(
  "animals/addAnimal",
  async (formData: Omit<IAnimalsMainData, "_uuid">, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/animals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formData]),
      });

      if (!response.ok) {
        throw new Error("Failed to add animal");
      }
      toast.success("Animal added successfully!");
      return await response.json();
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing animal
export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (
    { uuid, formData }: { uuid: string; formData: IAnimalsMainData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/animals/${uuid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update animal");
      }

      toast.success("Animal updated successfully!");
      return await response.json();
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  "animals/deleteAnimal",
  async (
    { id, url, key }: { id: string; url: string; key: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${url}/animals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete animal");
      }

      toast.success("Animal deleted successfully!");
      return id;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

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
