import {
  GlobalMainComponentBox,
  GlobalMainComponentPadding,
  InfoText,
} from "../../GlobalStyles";
import MainPageList from "./components/MainPageList";

const MainPage = () => {
  return (
    <GlobalMainComponentPadding>
      <GlobalMainComponentBox>
        <InfoText>Manage Pannel</InfoText>
        <MainPageList />
      </GlobalMainComponentBox>
    </GlobalMainComponentPadding>
  );
};

export default MainPage;
