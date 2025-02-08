import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  height: 100%;
`;
export const GlobalMainComponentPadding = styled.div`
  padding: 35px 60px;
  background-color: rgba(128, 128, 128, 0.278);
  width: 100%;
`;
export const GlobalMainComponentBox = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const InfoText = styled.h1`
  font-size: 40px;
  margin-bottom: 50px;
`;
export const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin: auto;
  width: 230px;
  height: 40px;

  &:hover {
    background: #0056b3;
  }
`;

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
export const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  resize: none;
  height: 200px;
`;
