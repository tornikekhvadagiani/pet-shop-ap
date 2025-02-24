import React, { useEffect, useRef, useState } from "react";
import {
  StyledForm,
  StyledFormMain,
  StyledInput,
  StyledInputFlex,
  StyledLabel,
  StyledTextArea,
} from "../../GlobalStyles";
import { SubmitButton } from "../../GlobalStyles";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addCategory,
  fetchCategoryById,
  updateCategory,
} from "../../store/category/category.thunks";
import { ICategoryData } from "../../globalTypes";

const CategoryForm = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const navigate = useNavigate();
  const { uuid } = useParams();
  const isEditing = Boolean(uuid);

  const dispatch = useDispatch<AppDispatch>();
  const [categoryData, setCategoryData] = useState<ICategoryData>();
  useEffect(() => {
    console.log(categoryData);
  }, []);

  useEffect(() => {
    if (isEditing && uuid) {
      dispatch(
        fetchCategoryById({
          id: uuid,
          url: import.meta.env.VITE_API_URL,
          key: import.meta.env.VITE_CATEGORY_KEY,
        })
      ).then((e) => setCategoryData(e.payload));
    }
  }, [dispatch, isEditing, uuid]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: titleRef.current?.value.trim() || "",
      description: descriptionRef.current?.value.trim() || "",
    };

    if (!formData.name || !formData.description) {
      toast.error("All fields must be filled!");
      return;
    }

    if (isEditing && uuid) {
      dispatch(
        updateCategory({
          id: uuid,
          url: import.meta.env.VITE_API_URL,
          key: import.meta.env.VITE_CATEGORY_KEY,
          formData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Category updated successfully!");
          navigate("/Main/Category");
        })
        .catch((error: string) => {
          toast.error(error || "Failed To Update Category.");
        });
    } else {
      dispatch(
        addCategory({
          url: import.meta.env.VITE_API_URL,
          key: import.meta.env.VITE_CATEGORY_KEY,
          formData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Category added successfully!");
          navigate("/Main/Category");
        })
        .catch((error: string) => {
          toast.error(error || "Failed To Add Category.");
        });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormMain>
        <StyledInputFlex>
          <StyledLabel>Category Title</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            ref={titleRef}
            defaultValue={categoryData?.name || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Category Description</StyledLabel>
          <StyledTextArea
            ref={descriptionRef}
            defaultValue={categoryData?.description || ""}
          />
        </StyledInputFlex>
      </StyledFormMain>

      <SubmitButton type="submit">
        {isEditing ? "Update Category" : "Add Category"}
      </SubmitButton>
    </StyledForm>
  );
};

export default CategoryForm;
