import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Error from "../components/error/error";

const routesApp = () => {
  const BackdropAction = ({ children }) => {
    return children;
  };

  return (
    <BackdropAction>
      <Routes>
        <Route path="/ToDoList" element={<Home />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BackdropAction>
  );
};

export default routesApp;
