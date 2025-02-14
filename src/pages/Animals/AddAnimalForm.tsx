import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  fetchAnimalById,
  addAnimal,
  updateAnimal,
} from "../../store/animals/animals.thunks";
import { IAnimalsData } from "../../globalTypes";

const AddAnimalForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceUSDRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const [isPopular, setIsPopular] = useState(false);

  const navigate = useNavigate();
  const { uuid } = useParams();
  const isEditing = Boolean(uuid);

  const dispatch = useDispatch<AppDispatch>();

  const [editingInfo, setEditingInfo] = useState<IAnimalsData>();

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchAnimalById(uuid as string)).then((e) => {
        setEditingInfo(e.payload);
        setIsPopular(e.payload?.isPopular || false);
      });
    }
  }, [dispatch, isEditing, uuid]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      _uuid: isEditing && uuid ? uuid : "",
      name: nameRef.current?.value.trim() || "",
      priceUSD: priceUSDRef.current?.value.trim() || "",
      description: descriptionRef.current?.value.trim() || "",
      stock: stockRef.current?.value.trim() || "",
      isPopular: isPopular,
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

    if (isEditing && uuid) {
      dispatch(updateAnimal({ uuid, formData })).then(() =>
        navigate("/Main/Animals")
      );
    } else {
      dispatch(addAnimal(formData)).then(() => navigate("/Main/Animals"));
    }
  };
  console.log(editingInfo);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormMain>
        <StyledInputFlex>
          <StyledLabel>Animal Name</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            ref={nameRef}
            defaultValue={editingInfo?.name || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Animal Price (USD)</StyledLabel>
          <StyledInput
            type="number"
            name="priceUSD"
            ref={priceUSDRef}
            defaultValue={editingInfo?.priceUSD || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Animal Description</StyledLabel>
          <StyledInput
            type="text"
            name="description"
            ref={descriptionRef}
            defaultValue={editingInfo?.description || ""}
          />
        </StyledInputFlex>

        <StyledInputFlex>
          <StyledLabel>Animal Stock</StyledLabel>
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
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
            />
            <StyledLabel>Is Popular?</StyledLabel>
          </StyledCheckboxContainer>
        </StyledInputFlex>
      </StyledFormMain>

      <SubmitButton type="submit">
        {isEditing ? "Update Animal" : "Add Animal"}
      </SubmitButton>
    </StyledForm>
  );
};

export default AddAnimalForm;
