import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Register from "../pages/register/register";

const routesApp = () => {
  const BackdropAction = ({ children }) => {
    return children;
  };

  return (
    <BackdropAction>
      <Routes>
        <Route path="/ToDoList" element={<Home />} />
        <Route path="/ToDoList/register" element={<Register />} />
      </Routes>
    </BackdropAction>
  );
};

export default routesApp;
