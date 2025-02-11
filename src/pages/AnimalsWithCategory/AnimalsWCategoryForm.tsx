import { useEffect, useState } from "react";
import {
  StyledInputFlex,
  StyledForm,
  StyledSelect,
  SubmitButton,
  StyledOption,
} from "../../GlobalStyles";
import useGetRequest from "../../CustomHooks/useGetRequest";
import { IAnimalsData, ICategoryData } from "../../globalTypes";
import usePostRequest, { IData } from "../../CustomHooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




const AnimalsWCategoryForm = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimalsData | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryData | null>(null);
  const [animalsData, setAnimalsData] = useState<IAnimalsData[] | null>(null);
  const [categoryData, setCategoryData] = useState<ICategoryData[] | null>(
    null
  );
  const navigate = useNavigate();
  const {
    VITE_CATEGORY_KEY,
    VITE_ANIMALS_KEY,
    VITE_API_URL,
    VITE_ANIMALS_WITH_CATEGORY_KEY,
  } = import.meta.env;

  useEffect(() => {
    const fetchAnimals = async () => {
      await useGetRequest({
        key: VITE_ANIMALS_KEY,
        setData: setAnimalsData,
        url: `${VITE_API_URL}/animals`,
      });
    };
    const fetchCategories = async () => {
      await useGetRequest({
        key: VITE_CATEGORY_KEY,
        setData: setCategoryData,
        url: `${VITE_API_URL}/category`,
      });
    };

    fetchAnimals();
    fetchCategories();
  }, []);

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const selectedObject =
      categoryData?.find((item) => item._uuid === selectedId) || null;
    setSelectedCategory(selectedObject);
  };

  const handleChangeAnimal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedObject =
      animalsData?.find((item) => item._uuid === selectedId) || null;
    setSelectedAnimal(selectedObject);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnimal?.name || !selectedCategory?.name) {
      toast.error("Animal or Category not selected!");
      return;
    }
    const newData: IData = {
      animal: {
        name: selectedAnimal.name,
        description: selectedAnimal.description,
        priceUSD: selectedAnimal.priceUSD,
        stock: selectedAnimal.stock,
        isPopular: selectedAnimal.isPopular,
      },
      category: {
        name: selectedCategory.name,
        description: selectedCategory.description,
      },
    };

    usePostRequest({
      data: newData,
      endPoint: "animals_with_categories",
      key: VITE_ANIMALS_WITH_CATEGORY_KEY,
      navigate,
      url: VITE_API_URL,
    });
  };

  return (
    <StyledForm onSubmit={addItem}>
      <StyledInputFlex>
        <StyledSelect
          onChange={handleChangeAnimal}
          value={selectedAnimal?._uuid || ""}
        >
          <StyledOption value="" disabled hidden>
            Select an animal
          </StyledOption>
          {animalsData?.map((e) => (
            <StyledOption value={e._uuid} key={e._uuid}>
              {e.name}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledInputFlex>

      <StyledInputFlex>
        <StyledSelect
          onChange={handleChangeCategory}
          value={selectedCategory?._uuid || ""}
        >
          <StyledOption value="" disabled hidden>
            Select an category
          </StyledOption>
          {categoryData?.map((e) => (
            <StyledOption value={e._uuid} key={e._uuid}>
              {e.name}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledInputFlex>

      <SubmitButton type="submit">Submit</SubmitButton>
    </StyledForm>
  );
};

export default AnimalsWCategoryForm;
