import { useNavigate } from "react-router-dom";
import style from "./error.module.css";

export default function Error() {
  const navigate = useNavigate();

  const HandleReturn = () => {
    navigate("/ToDoList");
  };

  return (
    <div className={style.containerError}>
      <div className={style.contentError}>
        <h4>Página não encontrada</h4>
        <button onClick={HandleReturn}>Voltas a Pagina Inicial</button>
      </div>
    </div>
  );
}
