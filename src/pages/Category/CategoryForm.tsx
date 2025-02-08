import { useRef } from "react";
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
import usePostRequest from "../../CustomHooks/usePostRequest";
import { StyledCategoryForm } from "./CategoryStyles";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const { VITE_CATEGORY_KEY, VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();

  const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: titleRef.current?.value.trim(),
      description: descriptionRef.current?.value.trim(),
    };
    console.log(formData);

    if (!formData.description || !formData.name) {
      toast.error("All fields must be filled!");
      return;
    } else {
      usePostRequest({
        url: VITE_API_URL,
        key: VITE_CATEGORY_KEY,
        endPoint: "category",
        data: formData,
        navigate,
      });
    }
  };
  return (
    <StyledForm onSubmit={addCategory}>
      <StyledCategoryForm>
        <StyledInputFlex>
          <StyledLabel>Category Title</StyledLabel>
          <StyledInput type="text" name="name" ref={titleRef} />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Category Desciption</StyledLabel>
          <StyledTextArea ref={descriptionRef} />
        </StyledInputFlex>
      </StyledCategoryForm>

      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
  );
};

export default CategoryForm;
