import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals } from "../../../store/animals/animalsSlice";
import { RootState, AppDispatch } from "../../../store";
import { useDolarToGel } from "../../../CustomHooks/useDolarToGel";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { editAction } from "../../../store/animals/edit.action";

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
import { StyledLoaderMain } from "../../../GlobalStyles";
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
  const { VITE_ANIMALS_KEY, VITE_API_URL } = import.meta.env;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { animals, isLoading } = useSelector(
    (state: RootState) => state.animals
  );

  useEffect(() => {
    useDolarToGel().then((rate) => setDolarToGelPrice(rate));
  }, []);

  useEffect(() => {
    if (dolarToGelPrice > 0) {
      dispatch(
        fetchAnimals({ url: `${VITE_API_URL}/animals`, key: VITE_ANIMALS_KEY })
      );
    }
  }, [dispatch, dolarToGelPrice]);

  useEffect(() => {
    const formattedData: Item[] = animals.map((item) => ({
      name: item.name,
      description: item.description,
      priceUSD: item.priceUSD,
      priceGEL: (Number(item.priceUSD) * dolarToGelPrice).toFixed(2),
      stock: item.stock,
      isPopular: item.isPopular,
      id: item._uuid,
    }));
    setFormattedAnimals(formattedData);
  }, [animals, dolarToGelPrice]);

  const deleteItem = (id: string) => {
    useDeleteRequest({
      endPoint: "animals",
      key: VITE_ANIMALS_KEY,
      url: VITE_API_URL,
      uuid: id,
      setIsLoaded: () => {}, // No need for `setIsLoaded` now
      refreshData: () =>
        dispatch(
          fetchAnimals({
            url: `${VITE_API_URL}/animals`,
            key: VITE_ANIMALS_KEY,
          })
        ),
    });
  };

  const edit = (currentInfo: Item) => {
    dispatch(editAction(currentInfo));
    navigate("/EditAnimals");
  };

  if (isLoading)
    return (
      <StyledLoaderMain>
        <h1>Loading</h1>
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
