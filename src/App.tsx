import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import { MainWrapper } from "./GlobalStyles";
import Navbar from "./components/Navbar";
import Animals from "./pages/Animals/Animals";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category/Category";
import AnimalsWithCategory from "./pages/AnimalsWithCategory/AnimalsWithCategory";
function App() {
  return (
    <>
      <MainWrapper>
        <Navbar />
        <Routes>
          <Route path="/Main/:fetchEndPoint" element={<MainPage />} />
          <Route path="/AddAnimals" element={<Animals />} />
          <Route path="/EditAnimals/:uuid" element={<Animals />} />
          <Route path="/AddCategory" element={<Category />} />
          <Route path="/EditCategory/:uuid" element={<Category />} />
          <Route
            path="/Add_AnimalsWithCategory"
            element={<AnimalsWithCategory />}
          />
          <Route
            path="/Edit_AnimalsWithCategory/:uuid"
            element={<AnimalsWithCategory />}
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          style={{ marginBottom: "50px", marginRight: "50px" }}
        />
      </MainWrapper>
    </>
  );
}

export default App;
