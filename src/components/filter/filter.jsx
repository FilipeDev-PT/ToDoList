import style from "./filter.module.css";
import Icons from "../icons/icons";
import { useState } from "react";

export default function Filter({
  setTasksFiltered,
  task,
  categories,
  search,
  setSearch,
}) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    var array = task;
    if (status != "") {
      array = task.filter((x) => x.isCompleted.toString() == status);
    }

    if (category != "") {
      array = task.filter(
        (x) => x.category.toLocaleLowerCase() == category.toLocaleLowerCase()
      );
    }

    setTasksFiltered(array);
    setSearch(!search);
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

        <div className={style.divfilteres}>
          <div>
            <select onChange={(e) => setCategory(e.target.value)}>
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
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value={true}>Concluidos</option>
              <option value={false}>Pendente</option>
            </select>
          </div>
        </div>
        <button className={style.butSaveFilter} onClick={handleSearch}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
