import style from "./header.module.css";
import Icons from "../icons/icons";
import Filter from "../filter/filter";

export default function Header({
  setTasksFiltered,
  categories,
  task,
  search,
  setSearch,
}) {
  const hadleFilterSearch = () => {
    setSearch(!search);
  };

  const handleSearchTasks = (e) => {
    setTasksFiltered(
      task.filter((x) =>
        x.title.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      )
    );
  };

  return (
    <div className={style.divHeader}>
      <div className={style.divContentTitleIcons}>
        <h1>ToDo List</h1>
        <Icons
          name={"Search"}
          className={"iconsSearch"}
          onClick={hadleFilterSearch}
        />
      </div>
      <div className={style.filterTitle}>
        <input
          type="text"
          onChange={(e) => handleSearchTasks(e.target.value)}
          placeholder="Pesquisar"
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
