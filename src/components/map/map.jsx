import style from "./map.module.css";
import { useGlobalContext } from "../../hooks/globalContext";
import Tasks from "../tasks/tasks";

export default function Map() {
  const { tasksFiltered } = useGlobalContext();

  return (
    <div className={style.divContentMap}>
      {tasksFiltered.map((task, index) => {
        return (
          <>
            <Tasks
              id={task.id}
              title={task.title}
              category={task.category}
              IsCompleted={task.isCompleted}
              index={index}
            />
          </>
        );
      })}
    </div>
  );
}
