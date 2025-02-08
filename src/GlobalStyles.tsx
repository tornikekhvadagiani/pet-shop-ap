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
