import style from "./header.module.css";
import { useGlobalContext } from "../../hooks/globalContext";
import Icons from "../icons/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const {
    HandleSearchTasks,
    categories,
    handleSearchCategories,
    handleSearchStatus,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [search, setSearch] = useState(false);

  const HandlePageRegister = () => {
    navigate("/ToDoList/register");
  };

  const HadleFilterSearch = () => {
    setSearch(!search);
  };

  return (
    <div className={style.divHeader}>
      <div className={style.divAllFilteres}>
        <Icons
          name={"Search"}
          className={"iconsSearch"}
          onClick={HadleFilterSearch}
        />
        <div
          className={`${style.divFilters} ${
            search ? style.FilterOpen : style.FilterClose
          }`}
        >
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
        </div>
      </div>
      <h1>ToDo List</h1>
      <button className={style.butAdd} onClick={HandlePageRegister}>
        Novo
        <Icons name={"Plus"} className={"iconsAdd"} />
      </button>
    </div>
  );
}
