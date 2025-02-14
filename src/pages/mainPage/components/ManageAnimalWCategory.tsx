import { useEffect } from "react";
import { StyledLoaderMain } from "../../../GlobalStyles";
import {
  fetchAnimalsWithCategories,
  deleteAnimalWithCategory,
} from "../../../store/animalsWithCategory/animalsWithCategory.thunks";
import {
  StyledAnimalsContainer,
  StyledCategoryHeader,
  StyledEdit,
  StyledListItemCategory,
  StyledSpan,
} from "../MainPageStyles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IAnimalsData } from "../../../globalTypes";

const ManageAnimalsWCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { animals, isLoading } = useSelector(
    (state: RootState) => state.animals
  );

  useEffect(() => {
    dispatch(fetchAnimalsWithCategories());
  }, [dispatch]);

  const handleDelete = async (uuid: string) => {
    await dispatch(deleteAnimalWithCategory(uuid));
    dispatch(fetchAnimalsWithCategories());
  };
  const handleEdit = async (currentInfo: IAnimalsData) => {
    navigate(`/Edit_AnimalsWithCategory/${currentInfo._uuid}`);
  };
  if (isLoading)
    return (
      <StyledLoaderMain>
        <h1>Loading</h1>
      </StyledLoaderMain>
    );

  return (
    <StyledAnimalsContainer>
      <StyledCategoryHeader>
        <StyledSpan>Animal Name</StyledSpan>
        <StyledSpan>Category Name</StyledSpan>
      </StyledCategoryHeader>
      {animals?.map((item, index) => (
        <StyledListItemCategory key={index}>
          <StyledEdit>
            <FaTrash onClick={() => handleDelete(item._uuid)} color="#f72d2d" />
            <FaEdit onClick={() => handleEdit(item)} />
          </StyledEdit>
          <StyledSpan>{item.animal?.name ?? "No Name"}</StyledSpan>
          <StyledSpan>{item.category?.name ?? "No Category"}</StyledSpan>
        </StyledListItemCategory>
      ))}
    </StyledAnimalsContainer>
  );
};

export default ManageAnimalsWCategory;
