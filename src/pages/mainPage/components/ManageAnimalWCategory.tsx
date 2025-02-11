import { useEffect, useState } from "react";
import {
  StyledAnimalsContainer,
  StyledCategoryHeader,
  StyledEdit,
  StyledListItemCategory,
  StyledSpan,
} from "../MainPageStyles";
import useGetRequest from "../../../CustomHooks/useGetRequest";
import { IAnimalsData } from "../../../globalTypes";
import { useDolarToGel } from "../../../CustomHooks/useDolarToGel";
import { StyledLoaderMain } from "../../../GlobalStyles";
import { FaEdit } from "react-icons/fa";
interface ITem {
  animal: {
    isPopular: boolean;
    name: string;
    description: string;
    priceUSD: string;
    stock: string;
  };
  category: {
    name: string;
    description: string;
  };
}
const ManageAnimalsWCategory = () => {
  const [formattedAnimals, setFormattedAnimals] = useState<ITem[]>([]);
  const [dolarToGelPrice, setDolarToGelPrice] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const { VITE_ANIMALS_WITH_CATEGORY_KEY, VITE_API_URL } = import.meta.env;
  useEffect(() => {
    useDolarToGel().then((rate) => setDolarToGelPrice(rate));
  }, []);

  useEffect(() => {
    if (dolarToGelPrice === null) return;

    useGetRequest({
      key: VITE_ANIMALS_WITH_CATEGORY_KEY,
      url: `${VITE_API_URL}/animals_with_categories`,
      setIsLoaded: setIsLoaded,
      setData: (data: IAnimalsData[]) => {
        const formattedData = data.map((item) => ({
          animal: item.animal ?? {
            isPopular: false,
            name: "",
            description: "",
            priceUSD: "0",
            stock: "0",
          },
          category: item.category ?? { name: "", description: "" },
        }));

        setFormattedAnimals(formattedData);
      },
    });
  }, [dolarToGelPrice]);

  if (!isLoaded)
    return (
      <StyledLoaderMain>
        <h1>Loading</h1>
      </StyledLoaderMain>
    );

  if (!isLoaded)
    return (
      <StyledLoaderMain>
        <h1>Loading</h1>
      </StyledLoaderMain>
    );
  return (
    <StyledAnimalsContainer>
      <StyledCategoryHeader>
        <StyledSpan>Animal Name</StyledSpan>
        <StyledSpan>Category</StyledSpan>
      </StyledCategoryHeader>
      {formattedAnimals?.map((item, index) => (
        <StyledListItemCategory key={index}>
          <StyledEdit>
            <FaEdit />
          </StyledEdit>
          <StyledSpan>{item.animal.name}</StyledSpan>
          <StyledSpan>{item.category.name}</StyledSpan>
        </StyledListItemCategory>
      ))}
    </StyledAnimalsContainer>
  );
};

export default ManageAnimalsWCategory;
