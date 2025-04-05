import { createContext, useContext } from "react";
import Loading from "../components/loading/loading";

const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  return (
    <>
      <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    </>
  );
};
