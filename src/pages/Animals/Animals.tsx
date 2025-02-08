import React from "react";
import {
  GlobalMainComponentBox,
  GlobalMainComponentPadding,
  InfoText,
} from "../../GlobalStyles";
import AddAnimalForm from "./AddAnimalForm";

const Animals = () => {
  return (
    <GlobalMainComponentPadding>
      <GlobalMainComponentBox>
        <InfoText>Add Animals</InfoText>
        <AddAnimalForm />
      </GlobalMainComponentBox>
    </GlobalMainComponentPadding>
  );
};

export default Animals;
