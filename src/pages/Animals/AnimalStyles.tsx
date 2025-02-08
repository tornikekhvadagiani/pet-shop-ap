import styled from "styled-components";

export const AnimalForm = styled.form``;
export const AnimalLabel = styled.label``;
export const AnimalDescription = styled.label``;
export const FormMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 100px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  margin: 10px 0px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
`;

export const InputFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 47%;
`;
