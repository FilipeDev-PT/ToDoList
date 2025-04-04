import style from "./formCategory.module.css";
import { useGlobalContext } from "../../hooks/globalContext";
import { useState } from "react";
import Icons from "../icons/icons";

export default function FormCategory() {
  const { HandleSubmitFormCategories, categories, HandleDeleteCategories } =
    useGlobalContext();

  const [name, setName] = useState();

  return (
    <div className={style.divFormCategory}>
      <form action={() => HandleSubmitFormCategories(name)}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome da nova categoria"
        />
        <button type="submit">Criar Categoria</button>
      </form>
      <div className={style.divContentCategories}>
        <h4>Categorias Existentes</h4>
        {categories.map((category, index) => {
          return (
            <div key={index} className={style.divItensCategories}>
              <div>
                <h5>{category.name}</h5>
              </div>
              <div>
                <Icons
                  name={"Trash2"}
                  onClick={() => HandleDeleteCategories(category.id)}
                  className={"iconsDelete"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
