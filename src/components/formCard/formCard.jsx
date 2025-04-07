import style from "./formCard.module.css";
import { useState } from "react";
import { PostTask } from "../../requests/requests";
import Icons from "../icons/icons";
import Loading from "../loading/loading";
import { useEffect } from "react";

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
  const [cardExist, setCardExist] = useState(false);
  const [categoryMissing, setCategoryMissing] = useState(false);
  const [titleWhite, setTitlewhite] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFormCard(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmitFormTask = async (event, title, category) => {
    event.preventDefault();
    verifyCardExist();
    if (!cardExist) {
      if (title.trim() == undefined || title.trim() == "") {
        setTitlewhite(true);
        return;
      } else {
        setTitlewhite(false);
      }
      if (!title || !category) {
        setCategoryMissing(true);
        return;
      }
      setLoading(true);
      try {
        const newTask = {
          title: title,
          categoryId: category,
        };
        const response = await PostTask(newTask);
        console.log(response);
      } catch {
        console.error("Erro na requisição");
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
            onSubmit={(event) => handleSubmitFormTask(event, title, category)}
            className={style.formCard}
          >
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o titulo do novo card"
            />
            <p className={cardExist ? style.pError : style.pDesbility}>
              Tarefa Já cadastrada
            </p>
            <p className={categoryMissing ? style.pError : style.pDesbility}>
              Categoria faltante
            </p>
            <p className={titleWhite ? style.pError : style.pDesbility}>
              Titulo em branco
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
