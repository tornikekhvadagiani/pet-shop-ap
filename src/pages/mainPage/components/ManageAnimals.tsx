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

import { useDolarToGel } from "../../../CustomHooks/useDolarToGel";
import { StyledLoaderMain } from "../../../GlobalStyles";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnimals,
  deleteAnimal,
} from "../../../store/animals/animals.thunks";
import { RootState, AppDispatch } from "../../../store/index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      dispatch(fetchAnimals({ url: VITE_API_URL, key: VITE_ANIMALS_KEY }));
    }
  }, [dolarToGelPrice, dispatch]);

  const deleteItem = (id: string) => {
    dispatch(deleteAnimal({ id, key: VITE_ANIMALS_KEY, url: VITE_API_URL }))
      .unwrap()
      .then(() => {
        toast.success("Animal deleted successfully!");
      })
      .catch((error: string) => {
        toast.error(error || "Failed to delete animal.");
      });
  };

  const edit = (currentInfo: Item) => {
    navigate("/EditAnimals", { state: currentInfo });
  };

  if (isLoading)
    return (
      <StyledLoaderMain>
        <h1>Loading...</h1>
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
      {animals.map((item: any) => (
        <StyledListItem key={item}>
          <StyledEdit>
            <FaTrash onClick={() => deleteItem(item._uuid)} color="#f72d2d" />
            <FaEdit onClick={() => edit(item)} />
          </StyledEdit>
          <StyledSpan>{item.name}</StyledSpan>
          <StyledPrice>
            ${item.priceUSD} /{" "}
            {(Number(item.priceUSD) * dolarToGelPrice).toFixed(2)} ₾
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
