import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
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
          <Route path="/Main" element={<MainPage />} />
          <Route path="/AddAnimals" element={<Animals />} />
          <Route path="/AddCategory" element={<Category />} />
          <Route
            path="/Add_AnimalsWithCategory"
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
