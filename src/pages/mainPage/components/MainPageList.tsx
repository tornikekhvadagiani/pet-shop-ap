import { useParams } from "react-router-dom";
import ManageAnimals from "./ManageAnimals";
import ManageAnimalsWCategory from "./ManageAnimalWCategory";
import ManageCategory from "./ManageCategory";
import ManageHeader from "./ManageHeader";

const MainPageList = () => {
  const { fetchEndPoint } = useParams();
  const endpoint = fetchEndPoint?.toLowerCase();

  const renderComponent = () => {
    switch (endpoint) {
      case "animals":
        return <ManageAnimals />;
      case "animals_with_category":
        return <ManageAnimalsWCategory />;
      case "category":
        return <ManageCategory />;
      default:
        return <p>Invalid endpoint</p>;
    }
  };

  return (
    <>
      <ManageHeader />
      {renderComponent()}
    </>
  );
};

export default MainPageList;
