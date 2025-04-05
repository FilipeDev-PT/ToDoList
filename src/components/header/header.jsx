import style from "./header.module.css";
import Icons from "../icons/icons";
import { useNavigate } from "react-router-dom";
import Filter from "../filter/filter";

export default function Header({
  setTasksFiltered,
  categories,
  task,
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const HandlePageRegister = () => {
    navigate("/ToDoList/register");
  };

  const HadleFilterSearch = () => {
    setSearch(!search);
  };

  return (
    <div className={style.divHeader}>
      <div className={style.divContentTitleIcons}>
        <h1>ToDo List</h1>
        <Icons
          name={"Search"}
          className={"iconsSearch"}
          onClick={HadleFilterSearch}
        />
      </div>
      <Filter
        setTasksFiltered={setTasksFiltered}
        task={task}
        categories={categories}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
