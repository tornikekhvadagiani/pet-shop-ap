import category from "/assets/icons/category.png";
import pets from "/assets/icons/pets.png";
import petscategory from "/assets/icons/petscategory.png";
import main from "/assets/icons/main.png";
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
