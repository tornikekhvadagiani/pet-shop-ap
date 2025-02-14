import {
  GlobalMainComponentBox,
  GlobalMainComponentPadding,
  InfoText,
} from "../../GlobalStyles";
import CategoryForm from "./CategoryForm";

const Category = () => {
  return (
    <GlobalMainComponentPadding>
      <GlobalMainComponentBox>
        <InfoText>Add Category</InfoText>
        <CategoryForm />
      </GlobalMainComponentBox>
    </GlobalMainComponentPadding>
  );
};

export default Category;
