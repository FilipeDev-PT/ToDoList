import style from "./tasks.module.css";
import Icons from "../icons/icons";
import { useState } from "react";
import { PutTask } from "../../requests/requests";
import { DeleteTask } from "../../requests/requests";
import Loading from "../loading/loading";

export default function Tasks({ id, title, category, IsCompleted, index }) {
  const [loading, setLoading] = useState(false);

  const handleCompleteTask = async (id) => {
    setLoading(true);
    try {
      await PutTask(id);
    } catch {
      console.error("Erro na requisição");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await DeleteTask(id);
    } catch {
      console.error("Erro na requisição");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div key={index} className={style.divContentTask}>
        <p className={style.pCont}># {index + 1}</p>
        <div className={style.iconsChecked}>
          <Icons
            name={`${IsCompleted ? "CircleCheck" : "Circle"}`}
            onClick={() => handleCompleteTask(id)}
            className={`${IsCompleted ? "iconsCheckedChecked" : "iconsCheck"}`}
          />
        </div>
        <div className={style.divContentText}>
          <h4 className={`${IsCompleted ? style.checked : ""}`}>
            {title.length > 20 ? title.substring(0, 23) + "..." : title}
          </h4>
          <h6 className={`${IsCompleted ? style.checked : ""}`}>
            Categoria: {category}
          </h6>
        </div>
        <div
          className={`${style.divStatus} ${
            IsCompleted ? style.divStatusChecked : ""
          }`}
        >
          <p>Status: {IsCompleted ? "Concluido" : "Pendente"}</p>
        </div>
        <div className={style.iconsDelete}>
          <Icons
            name={"Trash2"}
            onClick={() => handleDeleteTask(id)}
            className={"iconsDelete"}
          />
        </div>
      </div>
    </>
  );
}
