import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { GlobalProvider } from "./hooks/globalContext.jsx";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
