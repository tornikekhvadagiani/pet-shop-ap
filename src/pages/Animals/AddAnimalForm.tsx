import React, { useRef } from "react";
import {
  StyledCheckboxContainer,
  StyledInput,
  StyledLabel,
  StyledForm,
  StyledInputFlex,
  StyledFormMain,
} from "../../GlobalStyles";
import { SubmitButton } from "../../GlobalStyles";
import { toast } from "react-toastify";
import usePostRequest from "../../CustomHooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import usePutRequest from "../../CustomHooks/usePutRequest";

const AddAnimalForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceUSDRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const isPopularRef = useRef<HTMLInputElement>(null);

  const { VITE_ANIMALS_KEY, VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();
  const editingInfo = useSelector((state: RootState) => state.edit);
  const isEditing = editingInfo && Object.keys(editingInfo).length > 0;

  const addAnimal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value.trim() || "",
      priceUSD: priceUSDRef.current?.value.trim() || "",
      description: descriptionRef.current?.value.trim() || "",
      stock: stockRef.current?.value.trim() || "",
      isPopular: isPopularRef.current?.checked || false,
    };

    if (
      !formData.name ||
      !formData.priceUSD ||
      !formData.description ||
      !formData.stock
    ) {
      toast.error("All fields must be filled!");
      return;
    }

    isEditing
      ? usePutRequest({
          url: VITE_API_URL,
          key: VITE_ANIMALS_KEY,
          endPoint: "animals",
          data: formData,
          navigate,
          uuid: editingInfo?.id,
        })
      : usePostRequest({
          url: VITE_API_URL,
          key: VITE_ANIMALS_KEY,
          endPoint: "animals",
          data: formData,
          navigate,
        });
  };
  console.log(Boolean({}));

  return (
    <StyledForm onSubmit={addAnimal}>
      <StyledFormMain>
        <StyledInputFlex>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            ref={nameRef}
            defaultValue={editingInfo?.name || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Price (USD)</StyledLabel>
          <StyledInput
            type="number"
            name="priceUSD"
            ref={priceUSDRef}
            defaultValue={editingInfo?.priceUSD || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Description</StyledLabel>
          <StyledInput
            type="text"
            name="description"
            ref={descriptionRef}
            defaultValue={editingInfo?.description || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Stock</StyledLabel>
          <StyledInput
            type="number"
            name="stock"
            ref={stockRef}
            defaultValue={editingInfo?.stock || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledCheckboxContainer>
            <input
              type="checkbox"
              name="isPopular"
              ref={isPopularRef}
              defaultChecked={editingInfo?.isPopular || false}
            />
            <StyledLabel>Is Popular?</StyledLabel>
          </StyledCheckboxContainer>
        </StyledInputFlex>
      </StyledFormMain>

      <SubmitButton type="submit">
        Submit {isEditing ? "Editing" : ""}
      </SubmitButton>
    </StyledForm>
  );
};

export default AddAnimalForm;
