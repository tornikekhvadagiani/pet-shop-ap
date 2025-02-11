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

interface Item {
  name: string;
  description: string;
}
const ManageCategory = () => {
  const [animalsData, setAnimalsData] = useState<IAnimalsData[] | null>(null);
  const [formattedAnimals, setFormattedAnimals] = useState<Item[]>([]);
  const [dolarToGelPrice, setDolarToGelPrice] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const { VITE_CATEGORY_KEY, VITE_API_URL } = import.meta.env;
  useEffect(() => {
    useDolarToGel().then((rate) => setDolarToGelPrice(rate));
  }, []);

  useEffect(() => {
    if (dolarToGelPrice === null) return;

    useGetRequest({
      key: VITE_CATEGORY_KEY,
      url: `${VITE_API_URL}/category`,
      setIsLoaded: setIsLoaded,
      setData: (data: IAnimalsData[]) => {
        setAnimalsData(data);
        const formattedData: Item[] = data.map((item) => ({
          name: item.name,
          description: item.description,
        }));

        setFormattedAnimals(formattedData);
      },
    });
  }, [dolarToGelPrice]);

  if (!isLoaded)
    return (
      <StyledLoaderMain>
        <h1>Loading..</h1>
      </StyledLoaderMain>
    );

  if (!isLoaded)
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
      {formattedAnimals?.map((item, index) => (
        <StyledListItemCategory key={index}>
          <StyledEdit>
            <FaEdit />
          </StyledEdit>
          <StyledSpan>{item.name}</StyledSpan>
          <StyledSpan>{item.description}</StyledSpan>
        </StyledListItemCategory>
      ))}
    </StyledAnimalsContainer>
  );
};

export default ManageCategory;
