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
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { editAction } from "../../../store/animals/edit.action";
import { useNavigate } from "react-router-dom";
import useDeleteRequest from "../../../CustomHooks/useDeleteRequest";
interface Item {
  name: string;
  description: string;
  priceUSD: string;
  priceGEL: string;
  stock: string;
  isPopular: boolean;
  id: string;
}

const ManageAnimals = () => {
  const [formattedAnimals, setFormattedAnimals] = useState<Item[]>([]);
  const [dolarToGelPrice, setDolarToGelPrice] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const { VITE_ANIMALS_KEY, VITE_API_URL } = import.meta.env;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    useDolarToGel().then((rate) => setDolarToGelPrice(rate));
  }, []);

  const fetchAnimals = async () => {
    return new Promise<void>((resolve) => {
      useGetRequest({
        key: VITE_ANIMALS_KEY,
        setData: (data: IAnimalsData[]) => {
          const formattedData: Item[] = data.map((item) => ({
            name: item.name,
            description: item.description,
            priceUSD: item.priceUSD,
            priceGEL: (Number(item.priceUSD) * dolarToGelPrice).toFixed(2),
            stock: item.stock,
            isPopular: item.isPopular,
            id: item._uuid,
          }));
          setFormattedAnimals(formattedData);
          resolve();
        },
        setIsLoaded,
        url: `${VITE_API_URL}/animals`,
      });
    });
  };

  useEffect(() => {
    if (dolarToGelPrice > 0) fetchAnimals();
  }, [dolarToGelPrice]);

  const deleteItem = (id: string) => {
    useDeleteRequest({
      endPoint: "animals",
      key: VITE_ANIMALS_KEY,
      url: VITE_API_URL,
      uuid: id,
      setIsLoaded,
      refreshData: fetchAnimals,
    });
  };
  const edit = (currentInfo: Item) => {
    dispatch(editAction(currentInfo));

    navigate("/EditAnimals");
  };
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
            <FaTrash onClick={() => deleteItem(item.id)} color="#f72d2d" />
            <FaEdit onClick={() => edit(item)} />
          </StyledEdit>
          <StyledSpan>{item.name}</StyledSpan>
          <StyledPrice>
            ${item.priceUSD} / {item.priceGEL} ₾
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
