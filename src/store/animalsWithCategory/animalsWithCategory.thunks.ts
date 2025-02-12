import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnimalsData } from "../../globalTypes";
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

    const formattedData = data.items.map((item: IAnimalsData) => ({
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

    return formattedData;
  } catch (error: any) {
    toast.error("Failed to fetch animals with categories.");
    return rejectWithValue(error.message);
  }
});

export const deleteAnimalWithCategory = createAsyncThunk(
  "animals/deleteAnimalWithCategory",
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/animals_with_categories/${uuid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete animal and category.");
      }

      toast.success("Animal and category deleted successfully!");
      return uuid;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
