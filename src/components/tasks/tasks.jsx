import style from "./tasks.module.css";
import Icons from "../icons/icons";
import { useGlobalContext } from "../../hooks/globalContext";

export default function Tasks({ id, title, category, IsCompleted, index }) {
  const { HandleCompleteTask, HandleDeleteTask } = useGlobalContext();

  return (
    <div key={index} className={style.divContentTask}>
      <div className={style.divContentText}>
        <h4 className={`${IsCompleted ? style.checked : ""}`}>{title}</h4>
        <h6 className={`${IsCompleted ? style.checked : ""}`}>{category}</h6>
      </div>
      <div className={style.divContentIcons}>
        <Icons
          name={"CircleCheckBig"}
          onClick={() => HandleCompleteTask(id)}
          className={"iconsCheck"}
        />
        <Icons
          name={"Trash2"}
          onClick={() => HandleDeleteTask(id)}
          className={"iconsDelete"}
        />
      </div>
    </div>
  );
}
