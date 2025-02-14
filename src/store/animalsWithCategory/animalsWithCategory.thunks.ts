import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnimalsData, IAnimalsWCategoryData } from "../../globalTypes";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_ANIMALS_WITH_CATEGORY_KEY;

export const fetchAnimalsWithCategories = createAsyncThunk<
  IAnimalsData[],
  void,
  { rejectValue: string }
>("animals/fetchAnimalsWithCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/animals_with_categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((item: IAnimalsData) => ({
      _uuid: item._uuid,
      animal: item.animal ?? {
        isPopular: false,
        name: "",
        description: "",
        priceUSD: "0",
        stock: "0",
      },
      category: item.category ?? { name: "", description: "" },
    }));
  } catch (error: any) {
    toast.error("Failed to fetch animals with categories.");
    return rejectWithValue(error.message);
  }
});

export const fetchAnimalWithCategoryById = createAsyncThunk<
  IAnimalsData,
  string,
  { rejectValue: string }
>("animals/fetchAnimalWithCategoryById", async (uuid, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/animals_with_categories/${uuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch animal with category.");
    }

    return await response.json();
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addAnimalWithCategory = createAsyncThunk<
  IAnimalsData,
  IAnimalsWCategoryData,
  { rejectValue: string }
>("animals/addAnimalWithCategory", async (newData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/animals_with_categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newData]),
    });

    if (!response.ok) {
      throw new Error("Failed to add animal with category.");
    }

    const data = await response.json();
    toast.success("Animal with category added successfully!");
    return data;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const updateAnimalWithCategory = createAsyncThunk<
  IAnimalsData,
  { uuid: string; updatedData: IAnimalsWCategoryData },
  { rejectValue: string }
>(
  "animals/updateAnimalWithCategory",
  async ({ uuid, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/animals_with_categories/${uuid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update animal with category.");
      }

      const data = await response.json();
      toast.success("Animal with category updated successfully!");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAnimalWithCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("animals/deleteAnimalWithCategory", async (uuid, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/animals_with_categories/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete animal with category.");
    }

    toast.success("Animal with category deleted successfully!");
    return uuid;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});
