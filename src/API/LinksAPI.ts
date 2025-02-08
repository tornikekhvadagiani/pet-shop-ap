import category from "../../public/assets/icons/category.png";
import pets from "../../public/assets/icons/pets.png";
import petscategory from "../../public/assets/icons/petscategory.png";
import main from "../../public/assets/icons/main.png";
import { ILinks } from "../globalTypes";

export const LinksAPI: ILinks[] = [
  { title: "Main Page", linkTo: "/Main", icon: main },
  { title: "Add Pets", linkTo: "/AddPet", icon: pets },
  { title: "Add Category", linkTo: "/AddCategory", icon: category },
  {
    title: "Add Pets With Category",
    linkTo: "/AddPetsWithCategory",
    icon: petscategory,
  },
];
