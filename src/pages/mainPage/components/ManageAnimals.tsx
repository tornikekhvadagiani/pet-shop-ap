import { useEffect, useState } from "react";
import {
  StyledAnimalsContainer,
  StyledEdit,
  StyledListHeader,
  StyledListItem,
  StyledPopularBadge,
  StyledPrice,
  StyledSpan,
  StyledStock,
} from "../MainPageStyles";
import useGetRequest from "../../../CustomHooks/useGetRequest";
import { IAnimalsData } from "../../../globalTypes";
import { useDolarToGel } from "../../../CustomHooks/useDolarToGel";
import { TailSpin } from "react-loader-spinner";
import { StyledLoaderMain } from "../../../GlobalStyles";
import { FaEdit } from "react-icons/fa";

interface Item {
  name: string;
  description: string;
  priceUSD: string;
  priceGEL: string;
  stock: string;
  isPopular: boolean;
}
const ManageAnimals = () => {
  const [animalsData, setAnimalsData] = useState<IAnimalsData[] | null>(null);
  const [formattedAnimals, setFormattedAnimals] = useState<Item[]>([]);
  const [dolarToGelPrice, setDolarToGelPrice] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const { VITE_ANIMALS_KEY, VITE_API_URL } = import.meta.env;
  useEffect(() => {
    useDolarToGel().then((rate) => setDolarToGelPrice(rate));
  }, []);

  useEffect(() => {
    if (dolarToGelPrice === null) return;

    useGetRequest({
      key: VITE_ANIMALS_KEY,
      setData: (data: IAnimalsData[]) => {
        setAnimalsData(data);
        const formattedData: Item[] = data.map((item) => ({
          name: item.name,
          description: item.description,
          priceUSD: item.priceUSD,
          priceGEL: (Number(item.priceUSD) * dolarToGelPrice).toFixed(2),
          stock: item.stock,
          isPopular: item.isPopular,
        }));

        setFormattedAnimals(formattedData);
      },
      setIsLoaded: setIsLoaded,
      url: `${VITE_API_URL}/animals`,
    });
  }, [dolarToGelPrice]);

  if (!isLoaded)
    return (
      <StyledLoaderMain>
        <TailSpin color="royalblue" />
      </StyledLoaderMain>
    );

  if (!isLoaded)
    return (
      <StyledLoaderMain>
        <TailSpin color="royalblue" />
      </StyledLoaderMain>
    );
  return (
    <StyledAnimalsContainer>
      <StyledListHeader>
        <StyledSpan>Name</StyledSpan>
        <StyledSpan>Price (USD/GEL)</StyledSpan>
        <StyledSpan>Stock</StyledSpan>
        <StyledSpan>Popular</StyledSpan>
      </StyledListHeader>
      {formattedAnimals?.map((item, index) => (
        <StyledListItem key={index}>
          <StyledEdit>
            <FaEdit />
          </StyledEdit>
          <StyledSpan>{item.name}</StyledSpan>
          <StyledPrice>
            ${item.priceUSD} / {item.priceGEL} GEL
          </StyledPrice>
          <StyledStock $stock={Number(item.stock)}>{item.stock}</StyledStock>

          <StyledPopularBadge $isPopular={item.isPopular}>
            {item.isPopular ? "Yes" : "No"}
          </StyledPopularBadge>
        </StyledListItem>
      ))}
    </StyledAnimalsContainer>
  );
};

export default ManageAnimals;
