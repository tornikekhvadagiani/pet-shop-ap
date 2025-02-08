import React, { useRef } from "react";
import {
  CheckboxContainer,
  Input,
  Label,
  Form,
  InputFlex,
  FormMain,
} from "../../GlobalStyles";
import { SubmitButton } from "../../GlobalStyles";
import { toast } from "react-toastify";
import usePostRequest from "../../CustomHooks/usePostRequest";
import { useNavigate } from "react-router-dom";

const AddAnimalForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceUSDRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const isPopularRef = useRef<HTMLInputElement>(null);
  const { VITE_ANIMALS_KEY, VITE_API_URL } = import.meta.env;
  const navigate = useNavigate();

  const addAnimal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value.trim(),
      priceUSD: priceUSDRef.current?.value.trim(),
      description: descriptionRef.current?.value.trim(),
      stock: stockRef.current?.value.trim(),
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
    } else {
      usePostRequest({
        url: VITE_API_URL,
        key: VITE_ANIMALS_KEY,
        endPoint: "animals",
        data: formData,
        navigate,
      });
    }
  };

  return (
    <Form onSubmit={addAnimal}>
      <FormMain>
        <InputFlex>
          <Label>Name</Label>
          <Input type="text" name="name" ref={nameRef} />
        </InputFlex>

        <InputFlex>
          <Label>Price (USD)</Label>
          <Input type="number" name="priceUSD" ref={priceUSDRef} />
        </InputFlex>

        <InputFlex>
          <Label>Description</Label>
          <Input type="text" name="description" ref={descriptionRef} />
        </InputFlex>

        <InputFlex>
          <Label>Stock</Label>
          <Input type="number" name="stock" ref={stockRef} />
        </InputFlex>

        <InputFlex>
          <CheckboxContainer>
            <input type="checkbox" name="isPopular" ref={isPopularRef} />
            <Label>Is Popular?</Label>
          </CheckboxContainer>
        </InputFlex>
      </FormMain>

      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default AddAnimalForm;
