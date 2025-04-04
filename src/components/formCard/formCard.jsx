import style from "./formCard.module.css";
import { useGlobalContext } from "../../hooks/globalContext";
import { useState } from "react";

export default function FormCard() {
  const { categories, HandleSubmitFormTask } = useGlobalContext();

  const [title, setTitle] = useState();
  const [category, setCategory] = useState(0);

  return (
    <div className={style.divFormCard}>
      <form
        action={() => HandleSubmitFormTask(title, category)}
        className={style.formCard}
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o titulo do novo card"
        />
        <div>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Categoria</option>
            {categories.map((iten, index) => {
              return (
                <option key={index} value={iten.id}>
                  {iten.name}
                </option>
              );
            })}
          </select>
          <button type="submit" className={style.butAddNewTask}>
            Criar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
}
