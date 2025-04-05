import style from "./formCard.module.css";
import { useState } from "react";
import { PostTask } from "../../requests/itensTeste";
import Icons from "../icons/icons";

export default function FormCard({
  select,
  setSelect,
  categories,
  formCard,
  setFormCard,
}) {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const HandleSubmitFormTask = async (title, category) => {
    setLoading(true);
    try {
      if (!title || !category) return;
      const newTask = {
        title: title,
        categoryId: category,
      };
      const response = await PostTask(newTask);
      console.log(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleCloseForm = () => {
    setSelect(!select);
    setFormCard(!formCard);
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      {error ? <Loading /> : ""}
      <div
        className={`${style.containerFormCard} ${
          formCard ? style.formCardOpen : style.formCardClose
        }`}
      >
        <div className={style.divFormCard}>
          <Icons
            name="X"
            className="iconsClosefilter"
            onClick={handleCloseForm}
          />
          <h2>Cadastrar Nova Tarefa</h2>
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
      </div>
    </>
  );
}
