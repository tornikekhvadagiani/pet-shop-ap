import {
  GlobalMainComponentBox,
  GlobalMainComponentPadding,
  InfoText,
} from "../../GlobalStyles";
import AnimalsWCategoryForm from "./AnimalsWCategoryForm";

const AnimalsWithCategory = () => {
  return (
    <GlobalMainComponentPadding>
      <GlobalMainComponentBox>
        <InfoText>Create Animals With Category</InfoText>
        <AnimalsWCategoryForm />
      </GlobalMainComponentBox>
    </GlobalMainComponentPadding>
  );
};

export default AnimalsWithCategory;
