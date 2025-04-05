import style from "./filter.module.css";
import Icons from "../icons/icons";

export default function Filter({
  setTasksFiltered,
  task,
  categories,
  search,
  setSearch,
}) {
  const HandleSearchTasks = (e) => {
    setTasksFiltered(
      task.filter((x) =>
        x.title.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      )
    );
  };

  const handleSearchStatus = (e) => {
    if (e == "") {
      setTasksFiltered(task);
    } else {
      setTasksFiltered(task.filter((x) => x.isCompleted.toString() === e));
    }
  };
  const handleSearchCategories = (e) => {
    if (e == "") {
      setTasksFiltered(task);
    } else {
      setTasksFiltered(
        task.filter(
          (x) => x.category.toLocaleLowerCase() == e.toLocaleLowerCase()
        )
      );
    }
  };

  return (
    <div
      className={`${style.divContentFilter} ${
        search ? style.FilterOpen : style.FilterClose
      }`}
    >
      <div className={`${style.divFilters}`}>
        <Icons
          name="X"
          className="iconsClosefilter"
          onClick={() => setSearch(!search)}
        />
        <h2>Filtros</h2>

        <div className={style.filterTitle}>
          <input
            type="text"
            onChange={(e) => HandleSearchTasks(e.target.value)}
            placeholder="Pesquisar"
          />
        </div>

        <div className={style.divfilteres}>
          <div>
            <select onChange={(e) => handleSearchCategories(e.target.value)}>
              <option value="">Categoria</option>
              {categories.map((iten, index) => {
                return (
                  <option key={index} value={iten.name}>
                    {iten.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <select onChange={(e) => handleSearchStatus(e.target.value)}>
              <option value="">Status</option>
              <option value={true}>Concluidos</option>
              <option value={false}>Pendente</option>
            </select>
          </div>
        </div>
        <button className={style.butSaveFilter}>Salvar</button>
      </div>
    </div>
  );
}
