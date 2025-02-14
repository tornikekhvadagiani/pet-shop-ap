import { useEffect } from "react";
import {
  StyledAnimalsContainer,
  StyledCategoryHeader,
  StyledEdit,
  StyledListItemCategory,
  StyledSpan,
} from "../MainPageStyles";
import { StyledLoaderMain } from "../../../GlobalStyles";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  deleteCategory,
  fetchCategories,
} from "../../../store/category/category.thunks";
import { toast } from "react-toastify";

const ManageCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { categories, isLoading } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(
      fetchCategories({
        url: import.meta.env.VITE_API_URL,
        key: import.meta.env.VITE_CATEGORY_KEY,
      })
    );
  }, [dispatch]);

  const deleteItem = (id: string) => {
    dispatch(
      deleteCategory({
        id,
        key: import.meta.env.VITE_CATEGORY_KEY,
        url: import.meta.env.VITE_API_URL,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully!");
        dispatch(
          fetchCategories({
            url: import.meta.env.VITE_API_URL,
            key: import.meta.env.VITE_CATEGORY_KEY,
          })
        );
      })
      .catch((error: string) => {
        toast.error(error || "Failed to delete category.");
      });
  };

  if (isLoading)
    return (
      <StyledLoaderMain>
        <h1>Loading..</h1>
      </StyledLoaderMain>
    );

  return (
    <StyledAnimalsContainer>
      <StyledCategoryHeader>
        <StyledSpan>Name</StyledSpan>
        <StyledSpan>Description</StyledSpan>
      </StyledCategoryHeader>
      {categories?.map((item) => (
        <StyledListItemCategory key={item._uuid}>
          <StyledEdit>
            <FaTrash onClick={() => deleteItem(item._uuid)} color="#f72d2d" />
            <FaEdit onClick={() => navigate(`/EditCategory/${item._uuid}`)} />
          </StyledEdit>

          <StyledSpan>{item.name}</StyledSpan>
          <StyledSpan>{item.description}</StyledSpan>
        </StyledListItemCategory>
      ))}
    </StyledAnimalsContainer>
  );
};

export default ManageCategory;
