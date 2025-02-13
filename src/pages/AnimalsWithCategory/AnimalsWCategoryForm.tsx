import { useEffect, useState } from "react";
import {
  StyledInputFlex,
  StyledForm,
  StyledSelect,
  SubmitButton,
  StyledOption,
} from "../../GlobalStyles";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchAnimalsWithCategories,
  addAnimalWithCategory,
  updateAnimalWithCategory,
  fetchAnimalWithCategoryById,
} from "../../store/animalsWithCategory/animalsWithCategory.thunks";
import { fetchCategories } from "../../store/category/category.thunks";
import { fetchAnimals } from "../../store/animals/animals.thunks";
import { IAnimalsWCategoryData } from "../../globalTypes";

const AnimalsWCategoryForm = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { uuid } = useParams();
  const isEditing = Boolean(uuid);

  const animalsData = useSelector((state: RootState) => state.animals.animals);
  const categoryData = useSelector(
    (state: RootState) => state.category.categories
  );

  const editingInfo = useSelector((state: RootState) =>
    state.animalsWithCategory.animalsWithCategory.find(
      (item) => item._uuid === uuid
    )
  );
  useEffect(() => {
    dispatch(
      fetchAnimals({
        url: import.meta.env.VITE_API_URL,
        key: import.meta.env.VITE_ANIMALS_KEY,
      })
    ).then((res) => console.log("Fetched Animals:", res));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(
          fetchAnimals({
            url: import.meta.env.VITE_API_URL,
            key: import.meta.env.VITE_ANIMALS_KEY,
          })
        ),
        dispatch(
          fetchCategories({
            url: import.meta.env.VITE_API_URL,
            key: import.meta.env.VITE_CATEGORY_KEY,
          })
        ),
        dispatch(fetchAnimalsWithCategories()),
      ]);

      if (isEditing && uuid) {
        await dispatch(fetchAnimalWithCategoryById(uuid));
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch, isEditing, uuid]);

  useEffect(() => {
    if (editingInfo) {
      setSelectedAnimal(editingInfo?.animal?.uuid || "");
      setSelectedCategory(editingInfo?.category?.uuid || "");
    }
  }, [editingInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnimal || !selectedCategory) {
      toast.error("Please select both an animal and a category.");
      return;
    }

    const formData: IAnimalsWCategoryData = {
      animal: animalsData.find((a) => a._uuid === selectedAnimal)!,
      category: categoryData.find((c) => c._uuid === selectedCategory)!,
    };

    try {
      if (isEditing && uuid) {
        await dispatch(
          updateAnimalWithCategory({ uuid, updatedData: formData })
        );
      } else {
        await dispatch(addAnimalWithCategory(formData));
      }

      await dispatch(fetchAnimalsWithCategories());
      navigate("/Main/Animals_With_Category");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setSelectedAnimal("");
      setSelectedCategory("");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputFlex>
        <StyledSelect
          onChange={(e) => setSelectedAnimal(e.target.value)}
          value={selectedAnimal}
        >
          <StyledOption value="" disabled hidden>
            Select an animal
            {selectedAnimal}
          </StyledOption>
          {animalsData.map((e) => (
            <StyledOption key={e._uuid} value={e._uuid}>
              {e?.name}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledInputFlex>

      <StyledInputFlex>
        <StyledSelect
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <StyledOption value="" disabled hidden>
            Select a category
          </StyledOption>
          {categoryData.map((e) => (
            <StyledOption key={e._uuid} value={e._uuid}>
              {e.name}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledInputFlex>

      <SubmitButton
        type="submit"
        disabled={animalsData.length === 0 || categoryData.length === 0}
      >
        {isEditing ? "Update" : "Submit"}
      </SubmitButton>
    </StyledForm>
  );
};

export default AnimalsWCategoryForm;
