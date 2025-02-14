import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoryData } from "../../globalTypes";
import { toast } from "react-toastify";

interface CategoryPayload {
  url: string;
  key: string;
  formData?: {
    name: string;
    description: string;
  };
  id?: string;
}

export const fetchCategories = createAsyncThunk<
  ICategoryData[], 
  { url: string; key: string }, 
  { rejectValue: string } 
>("category/fetchCategories", async ({ url, key }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/category`, {
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
    return data.items;
  } catch (error: any) {
    toast.error("Something Went Wrong!");
    return rejectWithValue(error.message);
  }
});

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ url, key, formData }: CategoryPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify([formData]),
      });
      if (!response.ok) throw new Error("Failed to add category");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ url, key, id, formData }: CategoryPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update category");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ url, key, id }: CategoryPayload, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${url}/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete category");

      dispatch(fetchCategories({ url, key }));

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async ({ url, key, id }: CategoryPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch category");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
