import style from "./formCard.module.css";
import { useState } from "react";
import { PostTask } from "../../requests/itensTeste";
import Icons from "../icons/icons";

export default function FormCard({
  task,
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
  const [cardExist, setCardExist] = useState(false);

  const HandleSubmitFormTask = async (title, category) => {
    verifyCardExist();
    if (cardExist) {
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
    }
  };

  const handleCloseForm = () => {
    setSelect(!select);
    setFormCard(!formCard);
  };

  const verifyCardExist = () => {
    const categora = task.filter(
      (x) => x.title == title && x.categoryId == category
    );
    if (categora != "") {
      setCardExist(true);
    }
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
          <h4>Cadastrar Nova Tarefa</h4>
          <form
            action={() => HandleSubmitFormTask(title, category)}
            className={style.formCard}
          >
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o titulo do novo card"
            />
            <p className={cardExist ? style.pError : style.pDesbility}>
              Categoria Já cadastrada
            </p>
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
            </div>
            <button type="submit" className={style.butAddNewTask}>
              Criar Tarefa
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
