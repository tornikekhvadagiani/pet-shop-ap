import category from "../../public/assets/icons/category.png";
import pets from "../../public/assets/icons/pets.png";
import petscategory from "../../public/assets/icons/petscategory.png";
import main from "../../public/assets/icons/main.png";
import { ILinks } from "../globalTypes";

export const LinksAPI: ILinks[] = [
  { id: 0, title: "Main Page", linkTo: "/Main/Animals", icon: main },
  { id: 1, title: "Add Animals", linkTo: "/AddAnimals", icon: pets },
  { id: 2, title: "Add Category", linkTo: "/AddCategory", icon: category },
  {
    id: 3,
    title: "Add Animals/Category",
    linkTo: "/Add_AnimalsWithCategory",
    icon: petscategory,
  },
];
