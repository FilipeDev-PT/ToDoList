import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";

const routesApp = () => {
  const BackdropAction = ({ children }) => {
    return children;
  };

  return (
    <BackdropAction>
      <Routes>
        <Route path="/ToDoList" element={<Home />} />
      </Routes>
    </BackdropAction>
  );
};

export default routesApp;
