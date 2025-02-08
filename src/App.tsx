import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import { MainWrapper } from "./globalStyled/MainWrapper";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <MainWrapper>
        <Navbar />
        <Routes>
          <Route path="/Main" element={<MainPage />} />
        </Routes>
      </MainWrapper>
    </>
  );
}

export default App;
